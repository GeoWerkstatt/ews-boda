﻿using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EWS.Models
{
    /// <summary>
    /// Repräsentiert eine Bohrung in der Datenbank.
    /// </summary>
    [Table("bohrung")]
    public class Bohrung
    {
        /// <summary>
        /// Die Id der Bohrung.
        /// </summary>
        [Key]
        [Column("bohrung_id")]
        public int Id { get; set; }

        /// <summary>
        /// Foreign Key: ID der Tabelle Standort.
        /// </summary>
        [Column("standort_id")]
        public int StandortId { get; set; }

        /// <summary>
        /// Bezeichnung der Bohrung.
        /// </summary>
        [Column("bezeichnung")]
        public string Bezeichnung { get; set; }

        /// <summary>
        /// Datum der Bohrung.
        /// </summary>
        [Column("datum")]
        public DateTime? Datum { get; set; }

        /// <summary>
        /// Bemerkungen zur Bohrung.
        /// </summary>
        [Column("bemerkung")]
        public string? Bemerkung { get; set; }

        /// <summary>
        /// Foreign Key: ID Klassierung der Ablenkung.
        /// </summary>
        [Column("ablenkung")]
        public int? AblenkungId { get; set; }

        /// <summary>
        /// Codetyp Klassierung der Ablenkung.
        /// </summary>
        public CodeTyp? Ablenkung { get; set; }

        /// <summary>
        /// Durchmesser der Bohrlöcher [mm].
        /// </summary>
        [Column("durchmesserbohrloch")]
        public int? DurchmesserBohrloch { get; set; }

        /// <summary>
        /// Qualität der Angaben zur Bohrung.
        /// </summary>
        [Column("quali")]
        public int? Qualitaet { get; set; }

        /// <summary>
        /// Bemerkung zur Qualitätsangabe.
        /// </summary>
        [Column("qualibem")]
        public string? QualitaetBemerkung { get; set; }

        /// <summary>
        /// Autor geologische Aufnahme (Firma, Bearbeiter, Jahr).
        /// </summary>
        [Column("quelleref")]
        public string? QuelleRef { get; set; }

        /// <summary>
        /// Datum des Imports des Objektes.
        /// </summary>
        [Column("new_date")]
        public DateTime Erstellungsdatum { get; set; }

        /// <summary>
        /// Timestamp der letzten Änderung.
        /// </summary>
        [Column("mut_date")]
        public DateTime? Mutationsdatum { get; set; }

        /// <summary>
        /// Kürzel des Benutzers beim Anlegen des Objekts.
        /// </summary>
        [Column("new_usr")]
        public string UserErstellung { get; set; }

        /// <summary>
        /// Kürzel des Benutzers bei letzter Änderung.
        /// </summary>
        [Column("mut_usr")]
        public string? UserMutation { get; set; }

        /// <summary>
        /// Foreign Key: ID des Codetyps für Feld quali.
        /// </summary>
        [Column("h_quali")]
        public int HQualitaetId { get; set; }

        /// <summary>
        /// QCodetyps für Feld quali.
        /// </summary>
        public CodeTyp? HQualitaet { get; set; }

        /// <summary>
        /// Foreign Key: ID des Codetyps für Feld ablenkung.
        /// </summary>
        [Column("h_ablenkung")]
        public int HAblenkung { get; set; }

        /// <summary>
        /// Koordinate der Bohrung.
        /// </summary>
        [Column("wkb_geometry")]
        public Point? Geometrie { get; set; }

        /// <summary>
        /// Bohrprofile die der Bohrung zugeordnet sind.
        /// </summary>
        public List<Bohrprofil> Bohrprofile { get; set; }
    }
}
