import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GemeindenMap } from "../GemeindenMap";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DetailMap from "./DetailMap";
import ConfirmationDialog from "./ConfirmationDialog";
import DateUserInputs from "./DateUserInputs";

export default function StandortForm(props) {
  const {
    currentStandort,
    currentBohrung,
    setCurrentBohrung,
    handleNext,
    handleClose,
    editStandort,
    addStandort,
    deleteBohrung,
  } = props;
  const { control, handleSubmit, formState, reset } = useForm({ reValidateMode: "onChange" });
  const { isDirty } = formState;

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const onAddBohrung = () => {
    let bohrung = {
      standortId: currentStandort.id,
      bohrprofile: [],
      hQualitaet: 3,
      hAblenkung: 9,
      // defaultvalues inkl. geometry
      geometrie: { coordinates: [2626955, 1238676], type: "Point" },
    };
    setCurrentBohrung(bohrung);
    handleNext();
  };

  const onEditBohrung = (bohrung) => {
    setCurrentBohrung(bohrung);
    handleNext();
  };

  const onDeleteBohrung = (bohrung) => {
    setCurrentBohrung(bohrung);
    setOpenConfirmation(true);
  };

  const confirmDeleteBohrung = (confirmation) => {
    if (confirmation) {
      deleteBohrung(currentBohrung);
    }
    setOpenConfirmation(false);
  };

  const onSubmit = (formData) => {
    currentStandort
      ? editStandort(formData).finally(() => reset(formData))
      : addStandort(formData).finally(() => reset(formData));
  };

  return (
    <Box component="form" name="standort-form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>{currentStandort ? "Standort bearbeiten" : "Standort erstellen"}</DialogTitle>
      <DialogContent>
        <Controller
          name="bezeichnung"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={currentStandort?.bezeichnung || ""}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              autoFocus
              margin="normal"
              value={field.value}
              label="Bezeichnung des Standorts"
              type="text"
              fullWidth
              variant="standard"
              error={error !== undefined}
              helperText={error ? "Geben Sie eine Bezeichnung ein" : ""}
            />
          )}
        />
        <Controller
          name="bemerkung"
          control={control}
          defaultValue={currentStandort?.bemerkung}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              label="Bemerkung zum Standort"
              type="text"
              fullWidth
              variant="standard"
            />
          )}
        />
        {currentStandort && currentStandort.bohrungen?.length > 0 && (
          <TextField
            defaultValue={GemeindenMap[currentStandort?.gemeinde]}
            fullWidth
            type="string"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            label="Gemeinde"
          />
        )}
        <Controller
          name="grundbuchNr"
          control={control}
          defaultValue={currentStandort?.grundbuchNr}
          render={({ field }) => (
            <TextField
              {...field}
              inputProps={{
                maxLength: 40,
              }}
              margin="normal"
              label="Grundbuchnummer"
              type="text"
              fullWidth
              variant="standard"
            />
          )}
        />
        {currentStandort && (
          <React.Fragment>
            {currentStandort?.id && <DateUserInputs formObject={currentStandort}></DateUserInputs>}
            {currentStandort?.afuUser != null && (
              <React.Fragment>
                <TextField
                  defaultValue={currentStandort?.afuUser}
                  sx={{ marginRight: "6%", width: "47%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                  margin="normal"
                  label="AfU Freigabe erfolgt durch"
                  type="text"
                  variant="standard"
                />
                <TextField
                  name="afuDatum"
                  defaultValue={
                    currentStandort?.afuDatum ? new Date(currentStandort?.afuDatum).toLocaleDateString() : null
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ width: "47%" }}
                  margin="normal"
                  label="AfU Freigabe erfolgt am"
                  type="text"
                  variant="standard"
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        <Typography sx={{ marginTop: "15px" }} variant="h6" gutterBottom>
          Bohrungen ({currentStandort?.bohrungen ? currentStandort.bohrungen.length : 0})
          {currentStandort?.id != null && (
            <Tooltip title="Bohrung hinzufügen">
              <IconButton
                color="primary"
                name="add-button"
                disabled={currentStandort?.id == null}
                onClick={onAddBohrung}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          )}
          {currentStandort?.id == null && (
            <IconButton color="primary" disabled>
              <AddCircleIcon />
            </IconButton>
          )}
        </Typography>
        {currentStandort?.id == null && (
          <Typography>Bitte speichern Sie den Standort bevor Sie Bohrungen hinzufügen.</Typography>
        )}
        {currentStandort?.bohrungen?.length > 0 && (
          <React.Fragment>
            <Accordion sx={{ boxShadow: "none" }} defaultExpanded={true}>
              <Tooltip title="Übersichtskarte anzeigen">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Lokalität der Bohrungen</AccordionSummary>
              </Tooltip>
              {currentStandort?.bohrungen?.length > 0 && (
                <AccordionDetails>
                  <DetailMap bohrungen={currentStandort?.bohrungen}></DetailMap>
                </AccordionDetails>
              )}
            </Accordion>
            {currentStandort?.bohrungen?.length > 0 && (
              <Table name="seach-results-table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Bezeichnung</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentStandort.bohrungen.map((bohrung) => (
                    <TableRow key={bohrung.id}>
                      <TableCell>{bohrung.bezeichnung}</TableCell>
                      <TableCell>{(bohrung.datum && new Date(bohrung.datum).toLocaleDateString()) || null}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Bohrung editieren">
                          <IconButton onClick={() => onEditBohrung(bohrung)} name="edit-button" color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Bohrung löschen">
                          <IconButton
                            onClick={() => onDeleteBohrung(bohrung)}
                            name="delete-button"
                            color="primary"
                            aria-label="delete bohrung"
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
        <Button onClick={handleClose}> {!isDirty ? "Schliessen" : "Abbrechen"}</Button>
        <Button type="submit" disabled={!isDirty}>
          Standort Speichern
        </Button>
        <Button disabled>Standort freigeben</Button>
      </DialogActions>
      <ConfirmationDialog
        open={openConfirmation}
        confirm={confirmDeleteBohrung}
        entityName="Bohrung"
      ></ConfirmationDialog>
    </Box>
  );
}
