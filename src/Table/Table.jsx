import React from "react";
import "./Table.style.css";
import numeral from "numeral";
import { Card, CardContent, Typography } from "@material-ui/core";

function Table({ countries }) {
  countries.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return (
    <div className="table">
      <Card>
        <CardContent>
          <h5 className="text-center">Live cases by country</h5>
          {countries.map(({ country, cases }) => (
            <tr>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Table;
