import React, { useState, useEffect } from "react";
import "./App.css";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Layout from "./component/Layout";
import DataTable from "./component/DataTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

const App: React.FC = () => {
  const objFilterData = [
    {
      status: "New",
      count: 0
    },
    {
      status: "Screening",
      count: 0
    },
    {
      status: "Interview",
      count: 0
    },
    {
      status: "Offer",
      count: 0
    },
    {
      status: "Hired",
      count: 0
    },
    {
      status: "Not Hired",
      count: 0
    }
  ];
  const [dateFilter, setDateFilter] = useState("2019-11-01");
  const [candidateData, setCandidateData] = useState([]);
  const [filterData, setFilterData] = useState(objFilterData);
  const { REACT_APP_API_USERNAME, REACT_APP_API_PASSWORD } = process.env;
  useEffect(() => {
    const url = "https://api.jazz.co/codeChallenge/dQzv42tCFR/activity";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Basic " +
          btoa(`${REACT_APP_API_USERNAME}:${REACT_APP_API_PASSWORD}`),
        "Content-Type": "application/x-www-form-urlencoded"
      })
    })
      .then(response => response.json())
      .then(res => {
        setCandidateData(res);
      });
  }, []);

  console.log(candidateData);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(event.currentTarget.value);
    let filterDateFormat = new Date(event.currentTarget.value);
    let filterDateFormated =
      filterDateFormat.getFullYear() +
      "-" +
      (filterDateFormat.getMonth() + 1) +
      "-" +
      filterDateFormat.getDate();

    if (candidateData.length) {
      candidateData.map((candidate: any) => {
        let getDate: Date = new Date(candidate.transitionedAt);
        let formatted_getDate =
          getDate.getFullYear() +
          "-" +
          (getDate.getMonth() + 1) +
          "-" +
          getDate.getDate();
        if (formatted_getDate.toString() === filterDateFormated.toString()) {
          filterData.map((val, index) => {
            if (val.status === candidate.statusTo) {
              let dataInFilter: any = [...objFilterData];
              dataInFilter[index].count++;
              setFilterData([...dataInFilter]);
            }
          });
        } else {
          setFilterData([...objFilterData]);
        }
      });
    }
  };

  const classes = useStyles();
  return (
    <div className="container">
      <Layout />
      <br />
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Choose Date"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          value={dateFilter}
          onChange={handleChange}
        />
      </form>
      <br />
      <DataTable filterData={filterData} />
    </div>
  );
};

export default App;
