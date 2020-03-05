import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface CandidateData {
  status: String;

  count: Number;
}
interface Props {
  filterData: CandidateData[];
}

const DataTable: React.FC<Props> = ({ filterData }) => {
  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14
      }
    })
  )(TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.background.default
        }
      }
    })
  )(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 500
    }
  });

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="left">Count</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData.map((value: any, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="left">{value.status}</StyledTableCell>
              <StyledTableCell align="left">{value.count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
