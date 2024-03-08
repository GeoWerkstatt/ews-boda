﻿// <auto-generated />
using System;
using EWS;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EWS.Migrations;

[DbContext(typeof(EwsContext))]
partial class EwsContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder
            .HasDefaultSchema("bohrung")
            .HasAnnotation("ProductVersion", "8.0.2")
            .HasAnnotation("Relational:MaxIdentifierLength", 63);

        NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "postgis");
        NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

        modelBuilder.Entity("EWS.Models.Bohrprofil", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("bohrprofil_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Bemerkung")
                    .HasColumnType("text")
                    .HasColumnName("bemerkung");

                b.Property<int?>("BohrungId")
                    .HasColumnType("integer")
                    .HasColumnName("bohrung_id");

                b.Property<DateTime?>("Datum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("datum");

                b.Property<int?>("Endteufe")
                    .HasColumnType("integer")
                    .HasColumnName("endteufe");

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<int?>("FormationEndtiefe")
                    .HasColumnType("integer")
                    .HasColumnName("fmeto");

                b.Property<int?>("FormationFels")
                    .HasColumnType("integer")
                    .HasColumnName("fmfelso");

                b.Property<int>("HFormationEndtiefeId")
                    .HasColumnType("integer")
                    .HasColumnName("h_fmeto");

                b.Property<int>("HFormationFelsId")
                    .HasColumnType("integer")
                    .HasColumnName("h_fmfelso");

                b.Property<int>("HQualitaetId")
                    .HasColumnType("integer")
                    .HasColumnName("h_quali");

                b.Property<int>("HTektonikId")
                    .HasColumnType("integer")
                    .HasColumnName("h_tektonik");

                b.Property<int?>("Kote")
                    .HasColumnType("integer")
                    .HasColumnName("kote");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<string>("QualitaetBemerkung")
                    .HasColumnType("text")
                    .HasColumnName("qualibem");

                b.Property<int?>("QualitaetId")
                    .HasColumnType("integer")
                    .HasColumnName("quali");

                b.Property<int?>("Tektonik")
                    .HasColumnType("integer")
                    .HasColumnName("tektonik");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.HasIndex("BohrungId");

                b.HasIndex("HFormationEndtiefeId");

                b.HasIndex("HFormationFelsId");

                b.HasIndex("HQualitaetId");

                b.HasIndex("HTektonikId");

                b.HasIndex("QualitaetId");

                b.ToTable("bohrprofil", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.Bohrung", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("bohrung_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int?>("AblenkungId")
                    .HasColumnType("integer")
                    .HasColumnName("ablenkung");

                b.Property<string>("Bemerkung")
                    .HasColumnType("text")
                    .HasColumnName("bemerkung");

                b.Property<string>("Bezeichnung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("bezeichnung");

                b.Property<DateTime?>("Datum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("datum");

                b.Property<int?>("DurchmesserBohrloch")
                    .HasColumnType("integer")
                    .HasColumnName("durchmesserbohrloch");

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<Point>("Geometrie")
                    .HasColumnType("geometry")
                    .HasColumnName("wkb_geometry");

                b.Property<int>("HAblenkung")
                    .HasColumnType("integer")
                    .HasColumnName("h_ablenkung");

                b.Property<int>("HQualitaetId")
                    .HasColumnType("integer")
                    .HasColumnName("h_quali");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<int?>("Qualitaet")
                    .HasColumnType("integer")
                    .HasColumnName("quali");

                b.Property<string>("QualitaetBemerkung")
                    .HasColumnType("text")
                    .HasColumnName("qualibem");

                b.Property<string>("QuelleRef")
                    .HasColumnType("text")
                    .HasColumnName("quelleref");

                b.Property<int>("StandortId")
                    .HasColumnType("integer")
                    .HasColumnName("standort_id");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.HasIndex("AblenkungId");

                b.HasIndex("HQualitaetId");

                b.HasIndex("StandortId");

                b.ToTable("bohrung", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.Code", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("code_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int>("CodetypId")
                    .HasColumnType("integer")
                    .HasColumnName("codetyp_id");

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<string>("Kurztext")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("kurztext");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<int?>("Sortierung")
                    .HasColumnType("integer")
                    .HasColumnName("sort");

                b.Property<string>("Text")
                    .HasColumnType("text")
                    .HasColumnName("text");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.HasIndex("CodetypId");

                b.ToTable("code", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.CodeSchicht", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("codeschicht_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<string>("Kurztext")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("kurztext");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<int?>("Sortierung")
                    .HasColumnType("integer")
                    .HasColumnName("sort");

                b.Property<string>("Text")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("text");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.ToTable("codeschicht", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.CodeTyp", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("codetyp_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<string>("Kurztext")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("kurztext");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<string>("Text")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("text");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.ToTable("codetyp", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.Schicht", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("schicht_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Bemerkung")
                    .HasColumnType("text")
                    .HasColumnName("bemerkung");

                b.Property<int>("BohrprofilId")
                    .HasColumnType("integer")
                    .HasColumnName("bohrprofil_id");

                b.Property<int>("CodeSchichtId")
                    .HasColumnType("integer")
                    .HasColumnName("schichten_id");

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<int>("HQualitaetId")
                    .HasColumnType("integer")
                    .HasColumnName("h_quali");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<string>("QualitaetBemerkung")
                    .HasColumnType("text")
                    .HasColumnName("qualibem");

                b.Property<int?>("QualitaetId")
                    .HasColumnType("integer")
                    .HasColumnName("quali");

                b.Property<float>("Tiefe")
                    .HasColumnType("real")
                    .HasColumnName("tiefe");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.HasIndex("BohrprofilId");

                b.HasIndex("CodeSchichtId");

                b.HasIndex("HQualitaetId");

                b.HasIndex("QualitaetId");

                b.ToTable("schicht", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.Standort", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("standort_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime?>("AfuDatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("afu_date");

                b.Property<string>("AfuUser")
                    .HasColumnType("text")
                    .HasColumnName("afu_usr");

                b.Property<string>("Bemerkung")
                    .HasColumnType("text")
                    .HasColumnName("bemerkung");

                b.Property<string>("Bezeichnung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("bezeichnung");

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<bool>("FreigabeAfu")
                    .HasColumnType("boolean")
                    .HasColumnName("freigabe_afu");

                b.Property<string>("Gemeinde")
                    .HasColumnType("text")
                    .HasColumnName("gemeinde");

                b.Property<string>("GrundbuchNr")
                    .HasColumnType("text")
                    .HasColumnName("gbnummer");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.ToTable("standort", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.User", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("user_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<string>("Name")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("user_name");

                b.Property<int>("Role")
                    .HasColumnType("integer")
                    .HasColumnName("user_role");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.ToTable("user", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.Vorkommnis", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasColumnName("vorkommnis_id");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Bemerkung")
                    .HasColumnType("text")
                    .HasColumnName("bemerkung");

                b.Property<int>("BohrprofilId")
                    .HasColumnType("integer")
                    .HasColumnName("bohrprofil_id");

                b.Property<DateTime>("Erstellungsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("new_date");

                b.Property<int>("HQualitaetId")
                    .HasColumnType("integer")
                    .HasColumnName("h_quali");

                b.Property<int>("HTypId")
                    .HasColumnType("integer")
                    .HasColumnName("h_typ");

                b.Property<DateTime?>("Mutationsdatum")
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("mut_date");

                b.Property<int?>("Qualitaet")
                    .HasColumnType("integer")
                    .HasColumnName("quali");

                b.Property<string>("QualitaetBemerkung")
                    .HasColumnType("text")
                    .HasColumnName("qualibem");

                b.Property<float?>("Tiefe")
                    .HasColumnType("real")
                    .HasColumnName("tiefe");

                b.Property<int>("Typ")
                    .HasColumnType("integer")
                    .HasColumnName("typ");

                b.Property<string>("UserErstellung")
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("new_usr");

                b.Property<string>("UserMutation")
                    .HasColumnType("text")
                    .HasColumnName("mut_usr");

                b.HasKey("Id");

                b.HasIndex("BohrprofilId");

                b.HasIndex("HQualitaetId");

                b.HasIndex("HTypId");

                b.ToTable("vorkommnis", "bohrung");
            });

        modelBuilder.Entity("EWS.Models.Bohrprofil", b =>
            {
                b.HasOne("EWS.Models.Bohrung", null)
                    .WithMany("Bohrprofile")
                    .HasForeignKey("BohrungId");

                b.HasOne("EWS.Models.CodeTyp", "HFormationEndtiefe")
                    .WithMany()
                    .HasForeignKey("HFormationEndtiefeId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.CodeTyp", "HFormationFels")
                    .WithMany()
                    .HasForeignKey("HFormationFelsId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.Code", "HQualitaet")
                    .WithMany()
                    .HasForeignKey("HQualitaetId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.CodeTyp", "HTektonik")
                    .WithMany()
                    .HasForeignKey("HTektonikId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.Code", "Qualitaet")
                    .WithMany()
                    .HasForeignKey("QualitaetId");

                b.Navigation("HFormationEndtiefe");

                b.Navigation("HFormationFels");

                b.Navigation("HQualitaet");

                b.Navigation("HTektonik");

                b.Navigation("Qualitaet");
            });

        modelBuilder.Entity("EWS.Models.Bohrung", b =>
            {
                b.HasOne("EWS.Models.CodeTyp", "Ablenkung")
                    .WithMany()
                    .HasForeignKey("AblenkungId");

                b.HasOne("EWS.Models.CodeTyp", "HQualitaet")
                    .WithMany()
                    .HasForeignKey("HQualitaetId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.Standort", null)
                    .WithMany("Bohrungen")
                    .HasForeignKey("StandortId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Ablenkung");

                b.Navigation("HQualitaet");
            });

        modelBuilder.Entity("EWS.Models.Code", b =>
            {
                b.HasOne("EWS.Models.CodeTyp", "Codetyp")
                    .WithMany()
                    .HasForeignKey("CodetypId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Codetyp");
            });

        modelBuilder.Entity("EWS.Models.Schicht", b =>
            {
                b.HasOne("EWS.Models.Bohrprofil", null)
                    .WithMany("Schichten")
                    .HasForeignKey("BohrprofilId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.CodeSchicht", "CodeSchicht")
                    .WithMany()
                    .HasForeignKey("CodeSchichtId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.CodeTyp", "HQualitaet")
                    .WithMany()
                    .HasForeignKey("HQualitaetId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.Code", "Qualitaet")
                    .WithMany()
                    .HasForeignKey("QualitaetId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("CodeSchicht");

                b.Navigation("HQualitaet");

                b.Navigation("Qualitaet");
            });

        modelBuilder.Entity("EWS.Models.Vorkommnis", b =>
            {
                b.HasOne("EWS.Models.Bohrprofil", null)
                    .WithMany("Vorkomnisse")
                    .HasForeignKey("BohrprofilId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.Code", "HQualitaet")
                    .WithMany()
                    .HasForeignKey("HQualitaetId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("EWS.Models.CodeTyp", "HTyp")
                    .WithMany()
                    .HasForeignKey("HTypId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("HQualitaet");

                b.Navigation("HTyp");
            });

        modelBuilder.Entity("EWS.Models.Bohrprofil", b =>
            {
                b.Navigation("Schichten");

                b.Navigation("Vorkomnisse");
            });

        modelBuilder.Entity("EWS.Models.Bohrung", b =>
            {
                b.Navigation("Bohrprofile");
            });

        modelBuilder.Entity("EWS.Models.Standort", b =>
            {
                b.Navigation("Bohrungen");
            });
#pragma warning restore 612, 618
    }
}
