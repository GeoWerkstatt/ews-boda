import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DetailMap from "./DetailMap";
import DateUserInputs from "./DateUserInputs";
import { CodeTypes } from "./CodeTypes";

export default function VorkommnisForm(props) {
  const {
    currentBohrung,
    currentBohrprofil,
    currentVorkommnis,
    setCurrentVorkommnis,
    handleBack,
    addVorkommnis,
    editVorkommnis,
    readOnly,
  } = props;
  const { control, handleSubmit, formState, reset, register, setValue } = useForm({
    reValidateMode: "onChange",
  });
  const { isDirty } = formState;
  const [qualitaetCodes, setQualitaetCodes] = useState([]);
  const [typCodes, setTypCodes] = useState([]);

  const currentVorkommnisIndex =
    currentBohrprofil.vorkommnisse?.indexOf(
      currentBohrprofil.vorkommnisse.find((b) => b.id === currentVorkommnis?.id),
    ) || 0;
  const numberOfVorkommnisse = currentBohrprofil.vorkommnisse.length;

  // Get codes for dropdowns
  useEffect(() => {
    const getCodes = async () => {
      const qualitaetResponse = await fetch("/code?codetypid=" + CodeTypes.Vorkommnis_hquali);
      const typResponse = await fetch("/code?codetypid=" + CodeTypes.Vorkommnis_htyp);
      const qualitaetCodes = await qualitaetResponse.json();
      const typCodes = await typResponse.json();
      setQualitaetCodes(qualitaetCodes);
      setTypCodes(typCodes);
    };
    getCodes();
  }, []);

  // Update form values if currentVorkommnis changes, to allow next/previous navigation
  useEffect(() => {
    if (currentVorkommnis) {
      setValue("tiefe", currentVorkommnis?.tiefe);
      setValue("typId", currentVorkommnis?.typId);
      setValue("qualitaetId", currentVorkommnis?.qualitaetId);
      setValue("qualitaetBemerkung", currentVorkommnis?.qualitaetBemerkung);
      setValue("bemerkung", currentVorkommnis?.bemerkung);
    }
  }, [currentVorkommnis, setValue]);

  const currentInteraction = currentVorkommnis?.id ? "edit" : "add";

  const onSubmit = (formData) => {
    currentVorkommnis.id
      ? editVorkommnis(formData).finally(() => reset(formData))
      : addVorkommnis(formData).finally(() => reset(formData));
  };

  const onNavigateNext = () => setCurrentVorkommnis(currentBohrprofil.vorkommnisse[currentVorkommnisIndex + 1]);
  const onNavigatePrevious = () => setCurrentVorkommnis(currentBohrprofil.vorkommnisse[currentVorkommnisIndex - 1]);

  return (
    <Box component="form" name="vorkommnis-form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {currentInteraction === "edit" ? "Vorkommnis bearbeiten" : "Vorkommnis erstellen"}
        {currentVorkommnis?.id && currentVorkommnisIndex > 0 && (
          <Tooltip title="Zum vorherigen Vorkommnis">
            <IconButton onClick={onNavigatePrevious} color="primary">
              <ArrowLeftIcon />
            </IconButton>
          </Tooltip>
        )}
        {currentVorkommnis?.id && currentVorkommnisIndex < numberOfVorkommnisse - 1 && (
          <Tooltip title="Zum nächsten Vorkommnis">
            <IconButton onClick={onNavigateNext} color="primary">
              <ArrowRightIcon />
            </IconButton>
          </Tooltip>
        )}
      </DialogTitle>
      <DialogContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={2}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Controller
              name="tiefe"
              control={control}
              defaultValue={currentVorkommnis?.tiefe}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  sx={{ width: "47%" }}
                  margin="normal"
                  label="Tiefe [m u. T.]"
                  type="number"
                  variant="standard"
                  {...register("tiefe")}
                />
              )}
            />
            <Controller
              name="typId"
              control={control}
              defaultValue={currentVorkommnis?.typId}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  sx={{ width: "47%" }}
                  options={typCodes.sort((a, b) => a.kurztext.localeCompare(b.kurztext)).map((c) => c.id)}
                  value={field.value ?? null}
                  getOptionLabel={(option) => typCodes.find((c) => c.id === option)?.kurztext ?? ""}
                  onChange={(_, data) => field.onChange(data)}
                  autoHighlight
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      label="Typ des Vorkommnisses"
                      type="text"
                      variant="standard"
                      error={error !== undefined}
                      helperText={error ? "Wählen Sie einen Typ aus" : ""}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="bemerkung"
              control={control}
              defaultValue={currentVorkommnis?.bemerkung}
              render={({ field }) => (
                <TextField
                  {...field}
                  InputLabelProps={{ shrink: field.value != null }}
                  value={field.value ?? ""}
                  margin="normal"
                  multiline
                  label="Bemerkungen zum Vorkommnis"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("bemerkung")}
                />
              )}
            />
            <Controller
              name="qualitaetId"
              control={control}
              defaultValue={currentVorkommnis?.qualitaetId}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={qualitaetCodes.sort((a, b) => a.kurztext.localeCompare(b.kurztext)).map((c) => c.id)}
                  value={field.value ?? null}
                  getOptionLabel={(option) => qualitaetCodes.find((c) => c.id === option)?.kurztext ?? ""}
                  onChange={(_, data) => field.onChange(data)}
                  sx={{ width: "47%" }}
                  autoHighlight
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" label="Qualität" type="text" variant="standard" />
                  )}
                />
              )}
            />
            <Controller
              name="qualitaetBemerkung"
              control={control}
              defaultValue={currentVorkommnis?.qualitaetBemerkung}
              render={({ field }) => (
                <TextField
                  {...field}
                  InputLabelProps={{ shrink: field.value != null }}
                  value={field.value ?? ""}
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
            {currentVorkommnis?.id && <DateUserInputs formObject={currentVorkommnis}></DateUserInputs>}
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" }, paddingLeft: { xs: 0, md: 4 } }}>
            <Typography>Lokalität der Bohrung</Typography>
            <DetailMap bohrungen={[currentBohrung]} currentForm={"vorkommnis"}></DetailMap>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack}>{!isDirty || readOnly ? "Schliessen" : "Abbrechen"}</Button>
        <Button type="submit" disabled={!isDirty || readOnly}>
          Vorkommnis speichern
        </Button>
      </DialogActions>
    </Box>
  );
}
