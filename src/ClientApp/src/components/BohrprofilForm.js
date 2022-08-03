import React, { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Autocomplete, Box, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DetailMap from "./DetailMap";
import DateUserInputs from "./DateUserInputs";
import { CodeTypes } from "./Codetypes";
import ConfirmationDialog from "./ConfirmationDialog";

export default function BohrprofilForm(props) {
  const {
    currentBohrung,
    currentBohrprofil,
    setCurrentBohrprofil,
    currentSchicht,
    setCurrentSchicht,
    currentVorkommnis,
    setCurrentVorkommnis,
    setFinalStepIsSchicht,
    handleNext,
    handleBack,
    addBohrprofil,
    editBohrprofil,
    deleteSchicht,
    deleteVorkommnis,
    readOnly,
  } = props;
  const { control, handleSubmit, formState, reset, register, setValue } = useForm({
    reValidateMode: "onChange",
  });
  const { isDirty } = formState;
  const [qualitaetCodes, setQualitaetCodes] = useState([]);
  const [tektonikCodes, setTektonikCodes] = useState([]);
  const [formationFelsCodes, setFormationFelsCodes] = useState([]);
  const [formationEndtiefeCodes, setFormationEndtiefeCodes] = useState([]);
  const [openSchichtConfirmation, setOpenSchichtConfirmation] = useState(false);
  const [openVorkommnisConfirmation, setOpenVorkommnisConfirmation] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(true);

  const currentBohrprofilIndex =
    currentBohrung.bohrprofile?.indexOf(currentBohrung.bohrprofile.find((b) => b.id === currentBohrprofil.id)) || 0;
  const numberOfBohrprofile = currentBohrung.bohrprofile.length;

  // Get codes for dropdowns
  useEffect(() => {
    const getCodes = async () => {
      const qualitaetResponse = await fetch("/code?codetypid=" + CodeTypes.Bohrprofil_hquali);
      const tektonikResponse = await fetch("/code?codetypid=" + CodeTypes.Bohrprofil_htektonik);
      const formationFelsResponse = await fetch("/code?codetypid=" + CodeTypes.Bohrprofil_fmfelso);
      const formationEndtiefeResponse = await fetch("/code?codetypid=" + CodeTypes.Bohrprofil_fmeto);

      const qualitaetCodes = await qualitaetResponse.json();
      const tektonikCodes = await tektonikResponse.json();
      const formationFelsCodes = await formationFelsResponse.json();
      const formationEndtiefeCodes = await formationEndtiefeResponse.json();

      setQualitaetCodes(qualitaetCodes);
      setTektonikCodes(tektonikCodes);
      setFormationFelsCodes(formationFelsCodes);
      setFormationEndtiefeCodes(formationEndtiefeCodes);
    };
    getCodes();
  }, []);

  // Update form values if currentBohrprofil changes, to allow next/previous navigation
  useEffect(() => {
    if (currentBohrprofil) {
      setValue("datum", currentBohrprofil?.datum);
      setValue("bemerkung", currentBohrprofil?.bemerkung);
      setValue("kote", currentBohrprofil?.kote);
      setValue("endteufe", currentBohrprofil?.endteufe);
      setValue("tektonikId", currentBohrprofil?.tektonikId);
      setValue("formationFelsId", currentBohrprofil?.formationFelsId);
      setValue("formationEndtiefeId", currentBohrprofil?.formationEndtiefeId);
      setValue("qualitaetId", currentBohrprofil?.qualitaetId);
      setValue("qualitaetBemerkung", currentBohrprofil?.qualitaetBemerkung);
    }
  }, [currentBohrprofil, setValue]);

  const currentInteraction = currentBohrprofil?.id ? "edit" : "add";

  const onSubmit = (formData) => {
    currentBohrprofil.id
      ? editBohrprofil(formData).finally(() => reset(formData))
      : addBohrprofil(formData).finally(() => reset(formData));
  };

  const onAddSchicht = () => {
    const schicht = {
      bohrprofilId: currentBohrprofil.id,
      hQualitaet: CodeTypes.Schicht_hquali,
    };
    setCurrentSchicht(schicht);
    setFinalStepIsSchicht(true);
    handleNext();
  };

  const onEditSchicht = (schicht) => {
    setCurrentSchicht(schicht);
    setFinalStepIsSchicht(true);
    handleNext();
  };

  const onCopySchicht = (schicht) => {
    const schichtToCopy = structuredClone(schicht);
    delete schichtToCopy.id;
    delete schichtToCopy.erstellungsdatum;
    delete schichtToCopy.mutationsdatum;
    delete schichtToCopy.userMutation;
    // will be preserved via qualitaetId and codeSchichtId
    delete schichtToCopy.qualitaet;
    delete schichtToCopy.codeSchicht;
    setCurrentSchicht(schichtToCopy);
    setFinalStepIsSchicht(true);
    handleNext();
  };

  const onDeleteSchicht = (schicht) => {
    setCurrentSchicht(schicht);
    setOpenSchichtConfirmation(true);
  };

  const confirmDeleteSchicht = (confirmation) => {
    if (confirmation) {
      deleteSchicht(currentSchicht);
    }
    setOpenSchichtConfirmation(false);
  };

  const onAddVorkommnis = () => {
    const vorkommnis = {
      bohrprofilId: currentBohrprofil.id,
      hQualitaet: CodeTypes.Vorkommnis_hquali,
      hTyp: CodeTypes.Vorkommnis_htyp,
    };
    setCurrentVorkommnis(vorkommnis);
    setFinalStepIsSchicht(false);
    handleNext();
  };

  const onEditVorkommnis = (vorkommnis) => {
    setCurrentVorkommnis(vorkommnis);
    setFinalStepIsSchicht(false);
    handleNext();
  };

  const onCopyVorkommnis = (vorkommnis) => {
    const vorkommnisToCopy = structuredClone(vorkommnis);
    delete vorkommnisToCopy.id;
    delete vorkommnisToCopy.erstellungsdatum;
    delete vorkommnisToCopy.mutationsdatum;
    delete vorkommnisToCopy.userMutation;
    // will be preserved via qualitaetId and typId
    delete vorkommnisToCopy.qualitaet;
    delete vorkommnisToCopy.typ;
    setCurrentVorkommnis(vorkommnisToCopy);
    setFinalStepIsSchicht(false);
    handleNext();
  };

  const onDeleteVorkommnis = (vorkommnis) => {
    setCurrentVorkommnis(vorkommnis);
    setOpenVorkommnisConfirmation(true);
  };

  const confirmDeleteVorkommnis = (confirmation) => {
    if (confirmation) {
      deleteVorkommnis(currentVorkommnis);
    }
    setOpenVorkommnisConfirmation(false);
  };

  const onNavigateNext = () => setCurrentBohrprofil(currentBohrung.bohrprofile[currentBohrprofilIndex + 1]);
  const onNavigatePrevious = () => setCurrentBohrprofil(currentBohrung.bohrprofile[currentBohrprofilIndex - 1]);

  return (
    <Box component="form" name="bohrprofil-form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {currentInteraction === "edit" ? "Bohrprofil bearbeiten" : "Bohrprofil erstellen"}
        {currentBohrprofil?.id && currentBohrprofilIndex > 0 && (
          <Tooltip title="Zum vorherigen Bohrprofil">
            <IconButton onClick={onNavigatePrevious} color="primary">
              <ArrowLeftIcon />
            </IconButton>
          </Tooltip>
        )}
        {currentBohrprofil?.id && currentBohrprofilIndex < numberOfBohrprofile - 1 && (
          <Tooltip title="Zum nächsten Bohrprofil">
            <IconButton onClick={onNavigateNext} color="primary">
              <ArrowRightIcon />
            </IconButton>
          </Tooltip>
        )}
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="datum"
            control={control}
            defaultValue={currentBohrprofil?.datum != null ? currentBohrprofil.datum : null}
            render={({ field }) => (
              <DatePicker
                label="Datum des Bohrprofils"
                disableFuture
                inputFormat="dd.MM.yyyy"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                disabled={readOnly}
                renderInput={(params) => (
                  <TextField
                    {...field}
                    sx={{ marginRight: "6%", width: "47%" }}
                    margin="normal"
                    variant="standard"
                    {...params}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
        <Controller
          name="bemerkung"
          control={control}
          defaultValue={currentBohrprofil?.bemerkung}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              InputLabelProps={{ shrink: field.value != null }}
              margin="normal"
              multiline
              label="Bemerkungen zum Bohrprofil"
              type="text"
              fullWidth
              variant="standard"
              {...register("bemerkung")}
            />
          )}
        />
        <Controller
          name="kote"
          control={control}
          defaultValue={currentBohrprofil?.kote}
          render={({ field }) => (
            <TextField
              {...field}
              InputLabelProps={{ shrink: field.value != null }}
              value={field.value}
              sx={{ marginRight: "6%", width: "47%" }}
              margin="normal"
              label="Terrainkote der Bohrung [m ü. M.]"
              type="number"
              variant="standard"
              {...register("kote")}
            />
          )}
        />
        <Controller
          name="endteufe"
          control={control}
          defaultValue={currentBohrprofil?.endteufe}
          render={({ field }) => (
            <TextField
              {...field}
              InputLabelProps={{ shrink: field.value != null }}
              value={field.value}
              sx={{ width: "47%" }}
              margin="normal"
              label="Endtiefe der Bohrung [m u. T.]"
              type="number"
              variant="standard"
              {...register("endteufe")}
            />
          )}
        />
        <Controller
          name="tektonikId"
          control={control}
          defaultValue={currentBohrprofil?.tektonikId}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={tektonikCodes.sort((a, b) => a.kurztext.localeCompare(b.kurztext)).map((c) => c.id)}
              value={field.value}
              getOptionLabel={(option) => tektonikCodes.find((c) => c.id === option)?.kurztext}
              onChange={(_, data) => field.onChange(data)}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ marginRight: "6%", width: "47%" }}
                  margin="normal"
                  label="Klassierung der Tektonik"
                  type="text"
                  variant="standard"
                />
              )}
            />
          )}
        />
        <Controller
          name="formationFelsId"
          control={control}
          defaultValue={currentBohrprofil?.formationFelsId}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={formationFelsCodes.sort((a, b) => a.kurztext.localeCompare(b.kurztext)).map((c) => c.id)}
              value={field.value}
              getOptionLabel={(option) => formationFelsCodes.find((c) => c.id === option)?.kurztext}
              onChange={(_, data) => field.onChange(data)}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "47%" }}
                  margin="normal"
                  label="Formation Felsoberfläche"
                  type="text"
                  variant="standard"
                />
              )}
            />
          )}
        />
        <Controller
          name="formationEndtiefeId"
          control={control}
          defaultValue={currentBohrprofil?.formationEndtiefeId}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={formationEndtiefeCodes.sort((a, b) => a.kurztext.localeCompare(b.kurztext)).map((c) => c.id)}
              value={field.value}
              getOptionLabel={(option) => formationEndtiefeCodes.find((c) => c.id === option)?.kurztext}
              onChange={(_, data) => field.onChange(data)}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ marginRight: "6%", width: "47%" }}
                  margin="normal"
                  label="Formation auf Endtiefe"
                  type="text"
                  variant="standard"
                />
              )}
            />
          )}
        />
        <Controller
          name="qualitaetId"
          control={control}
          defaultValue={currentBohrprofil?.qualitaetId}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={qualitaetCodes.sort((a, b) => a.kurztext.localeCompare(b.kurztext)).map((c) => c.id)}
              value={field.value}
              getOptionLabel={(option) => qualitaetCodes.find((c) => c.id === option)?.kurztext}
              onChange={(_, data) => field.onChange(data)}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "47%" }}
                  margin="normal"
                  label="Qualität der Angaben zum Bohrprofil"
                  type="text"
                  variant="standard"
                />
              )}
            />
          )}
        />
        <Controller
          name="qualitaetBemerkung"
          control={control}
          defaultValue={currentBohrprofil?.qualitaetBemerkung}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              InputLabelProps={{ shrink: field.value != null }}
              margin="normal"
              multiline
              label="Bemerkungen zur Qualitätsangabe"
              type="text"
              fullWidth
              variant="standard"
              {...register("qualitaetBemerkung")}
            />
          )}
        />
        {currentBohrprofil?.id && <DateUserInputs formObject={currentBohrprofil}></DateUserInputs>}
        <Accordion
          sx={{ boxShadow: "none" }}
          expanded={mapExpanded}
          onChange={(_, expanded) => setMapExpanded(expanded)}
        >
          <Tooltip title={mapExpanded ? "Übersichtskarte verbergen" : "Übersichtskarte anzeigen"}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Lokalität der Bohrung</AccordionSummary>
          </Tooltip>
          <AccordionDetails>
            <DetailMap bohrungen={[currentBohrung]} currentForm={"bohrprofil"}></DetailMap>
          </AccordionDetails>
        </Accordion>
        <Typography sx={{ marginTop: "15px" }} variant="h6" gutterBottom>
          Schichten ({currentBohrprofil?.schichten ? currentBohrprofil.schichten.length : 0})
          <Tooltip title="Schicht hinzufügen">
            <IconButton
              color="primary"
              name="add-schicht-button"
              disabled={readOnly || currentBohrprofil?.id == null}
              onClick={onAddSchicht}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        {currentBohrprofil?.id == null && (
          <Typography>Bitte speichern Sie das Bohrprofil bevor Sie Schichten und Vorkommnisse hinzufügen.</Typography>
        )}
        {currentBohrprofil?.schichten?.length > 0 && (
          <React.Fragment>
            {currentBohrprofil?.schichten?.length > 0 && (
              <Table name="schichten-table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tiefe [m u. T.]</TableCell>
                    <TableCell>Schichtgrenze</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentBohrprofil.schichten.map((schicht) => (
                    <TableRow key={schicht.id}>
                      <TableCell>{schicht.tiefe}</TableCell>
                      <TableCell>{schicht.codeSchicht?.kurztext}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Schicht editieren">
                          <IconButton onClick={() => onEditSchicht(schicht)} name="edit-button" color="primary">
                            {readOnly ? <PreviewIcon /> : <EditIcon />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Schicht duplizieren">
                          <IconButton
                            onClick={() => onCopySchicht(schicht)}
                            name="copy-button"
                            color="primary"
                            disabled={readOnly}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Schicht löschen">
                          <IconButton
                            onClick={() => onDeleteSchicht(schicht)}
                            name="delete-button"
                            color="primary"
                            disabled={readOnly}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </React.Fragment>
        )}
        <Typography sx={{ marginTop: "15px" }} variant="h6" gutterBottom>
          Vorkommnisse ({currentBohrprofil?.vorkommnisse ? currentBohrprofil.vorkommnisse.length : 0})
          <Tooltip title="Vorkommnis hinzufügen">
            <IconButton
              color="primary"
              name="add-vorkommnis-button"
              disabled={readOnly || currentBohrprofil?.id == null}
              onClick={onAddVorkommnis}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        {currentBohrprofil?.vorkommnisse?.length > 0 && (
          <React.Fragment>
            {currentBohrprofil?.vorkommnisse?.length > 0 && (
              <Table name="vorkommnisse-table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tiefe [m u.T]</TableCell>
                    <TableCell>Typ</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentBohrprofil.vorkommnisse.map((vorkommnis) => (
                    <TableRow key={vorkommnis.id}>
                      <TableCell>{vorkommnis.tiefe}</TableCell>
                      <TableCell>{vorkommnis.typ?.kurztext}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Vorkommnis editieren">
                          <IconButton onClick={() => onEditVorkommnis(vorkommnis)} name="edit-button" color="primary">
                            {readOnly ? <PreviewIcon /> : <EditIcon />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Vorkommnis duplizieren">
                          <IconButton
                            onClick={() => onCopyVorkommnis(vorkommnis)}
                            name="copy-button"
                            color="primary"
                            disabled={readOnly}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Vorkommnis löschen">
                          <IconButton
                            onClick={() => onDeleteVorkommnis(vorkommnis)}
                            name="delete-button"
                            color="primary"
                            disabled={readOnly}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack}>{!isDirty || readOnly ? "Schliessen" : "Abbrechen"}</Button>
        <Button type="submit" disabled={!isDirty || readOnly}>
          Bohrprofil speichern
        </Button>
      </DialogActions>
      <ConfirmationDialog
        open={openSchichtConfirmation}
        confirm={confirmDeleteSchicht}
        entityName="Schicht"
      ></ConfirmationDialog>
      <ConfirmationDialog
        open={openVorkommnisConfirmation}
        confirm={confirmDeleteVorkommnis}
        entityName="Vorkommnis"
      ></ConfirmationDialog>
    </Box>
  );
}
