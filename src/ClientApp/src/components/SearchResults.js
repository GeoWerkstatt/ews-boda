import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import Title from "./Title";
import { UserRolesMap } from "../UserRolesMap";

export default function SearchResults(props) {
  const { standorte, openEditForm, onDeleteStandort, currentUser, page, setPage } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isStandortReadOnly = (standort) => standort.freigabeAfu && currentUser?.role === UserRolesMap.Extern;

  return (
    <React.Fragment>
      <Title>Standorte</Title>
      <Table name="search-results-table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Gemeinde</TableCell>
            <TableCell>Grundbuchnummer</TableCell>
            <TableCell>Bezeichnung</TableCell>
            <TableCell>Anzahl Bohrungen</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standorte &&
            standorte.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((standort) => (
              <TableRow key={standort.id}>
                <TableCell sx={{ width: "20%", wordBreak: "break-all" }}>{standort.gemeinde}</TableCell>
                <TableCell sx={{ width: "30%", wordBreak: "break-all" }}>{standort.grundbuchNr}</TableCell>
                <TableCell sx={{ width: "30%", wordBreak: "break-all" }}>{standort.bezeichnung}</TableCell>
                <TableCell sx={{ width: "10%", wordBreak: "break-all" }}>{standort.bohrungen?.length}</TableCell>
                <TableCell sx={{ width: "10%", wordBreak: "break-all" }} align="right">
                  <Tooltip title={isStandortReadOnly(standort) ? "Standort anzeigen" : "Standort editieren"}>
                    <IconButton
                      name="edit-button"
                      onClick={() => openEditForm(standort)}
                      color="primary"
                      aria-label="edit standort"
                      data-cy={`edit-standort-${standort.id}-button`}
                    >
                      {isStandortReadOnly(standort) ? <PreviewIcon /> : <EditIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Standort löschen">
                    <IconButton
                      name="delete-button"
                      onClick={() => onDeleteStandort(standort)}
                      color="primary"
                      aria-label="delete standort"
                      disabled={isStandortReadOnly(standort)}
                      data-cy={`delete-standort-${standort.id}-button`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 50]}
              page={page}
              count={standorte.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Standorte pro Seite"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
}
