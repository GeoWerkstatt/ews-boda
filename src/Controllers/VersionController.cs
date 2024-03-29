﻿using EWS.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace EWS;

[Authorize(Policy = PolicyNames.Extern)]
[ApiController]
[Route("[controller]")]
public class VersionController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        var assembly = typeof(Program).Assembly;
        return assembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion ??
            assembly.GetName().Version.ToString();
    }
}
