﻿using EWS;
using EWS.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using NetTopologySuite.IO.Converters;
using System.Net.Http.Headers;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddControllersWithViews()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new GeoJsonConverterFactory()));

builder.Services.AddHttpClient();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "USPSLS",
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Auth:IssuerSigningKey"])),
        };
    });

// The user context containing the current logged-in user.
builder.Services.AddScoped<UserContext>();

var connectionString = builder.Configuration.GetConnectionString("BohrungContext");
builder.Services.AddDbContext<EwsContext>(x => x.UseNpgsql(connectionString, option => option.UseNetTopologySuite().UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));

var app = builder.Build();

// Migrate db changes on startup
using var scope = app.Services.CreateScope();
using var context = scope.ServiceProvider.GetRequiredService<EwsContext>();
context.Database.Migrate();

if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    // Only seed if database is empty
    if (!context.Standorte.Any()) context.SeedData();

    // Use HTTPS redirection in development environment only due to unwanted redirects
    // with jwilder/nginx-proxy reverse proxy in production mode.
    app.UseHttpsRedirection();
}

app.UseStaticFiles();
app.UseRouting();

// Inject custom predefined JSON web token in development mode.
// Check appsettings.Development.json for more predefined JWT.
if (app.Environment.IsDevelopment())
{
    app.Use(async (context, next) =>
    {
        if (StringValues.IsNullOrEmpty(context.Request.Headers.Authorization))
        {
            context.Request.Headers.Authorization =
                new AuthenticationHeaderValue("Bearer", builder.Configuration["Auth:Token:Extern"]).ToString();
        }

        // Call the next delegate/middleware in the pipeline.
        await next(context).ConfigureAwait(false);
    });
}

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<CheckAuthorizedMiddleware>();
app.UseMiddleware<AutoUserRegistrationMiddleware>();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
