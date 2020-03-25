import React from "react";
import useLocalStorage from "./use-local-storage";
import TableExport from "./TableExport";
import { numberWithCommas, numberToPercent, numberToDollar } from "./utilities";

export default function TimeSeries({ timeSeries }) {
  const [rawformat, setFormat] = useLocalStorage("format-columns", "true");
  const format = rawformat === "true";
  const conversions = {
    sales: 100000.0,
    cpc: 100000.0,
    spend: 100000.0
  };
  const formats = {
    acos: numberToPercent(1),
    ctr: numberToPercent(2),
    sales: numberToDollar(2),
    spend: numberToDollar(2),
    cpc: numberToDollar(3),
    impressions: numberWithCommas,
    clicks: numberWithCommas,
    orders: numberWithCommas
  };

  const header_row = ["Month"];
  const rows_unsorted = [];

  timeSeries.metrics.forEach(function(data) {
    header_row.push(data.name);
  });

  timeSeries.categories.forEach(function(month, index) {
    const row = [];
    row.push(month);
    timeSeries.metrics.forEach(function(data) {
      const metricDat = data.dataSet[index];
      let elDat = false;
      if (conversions.hasOwnProperty(data.name)) {
        elDat = metricDat / conversions[data.name];
      } else {
        elDat = metricDat;
      }

      if (format && formats.hasOwnProperty(data.name)) {
        row.push(formats[data.name](elDat));
      } else {
        row.push(elDat);
      }
    });
    rows_unsorted.push(row);
  });
  const rows = rows_unsorted.reverse();
  const csvRows = rows.map(function(eachRow, index) {
    const row = {};
    header_row.forEach(function(element, index) {
      row[element] = eachRow[index];
    });
    return row;
  });

  return (
    <div className="container-fluid">
      <div>
        Show Raw Unformatted Data:
        <label htmlFor="radioform2">
          <input
            id="radioform2"
            name="radioform2"
            checked={rawformat === "true"}
            onChange={e => {
              setFormat("true");
            }}
            type="radio"
          />
          False
        </label>
        <label htmlFor="radioform1">
          <input
            name="radioform1"
            id="radioform1"
            checked={rawformat === "false"}
            onChange={e => {
              setFormat("false");
            }}
            type="radio"
          />
          True
        </label>
      </div>
      <div>
        <TableExport data={csvRows} filename="campaigns-export.csv" />
      </div>
      <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            {header_row.map(function(col) {
              return <th key={col}>{col}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map(function(eachRow, index) {
            return (
              <tr key={index + JSON.stringify(eachRow)}>
                {eachRow.map(function(eachDat, index) {
                  return <td key={index + "-" + eachDat}>{eachDat}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
