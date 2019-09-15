import React from "react";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberToPercent(decimals) {
  return function(percent) {
    return `${Number(percent).toFixed(decimals)}%`;
  };
}

function numberToDollar(decimals) {
  return function(dollHairs) {
    return `$${Number(dollHairs).toFixed(decimals)}`;
  };
}

function Table({ dat, format }) {
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
  const rows = [];

  dat.timeSeries.metrics.forEach(function(data) {
    header_row.push(data.name);
  });

  dat.timeSeries.categories.forEach(function(month, index) {
    const row = [];
    row.push(month);
    dat.timeSeries.metrics.forEach(function(data) {
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
    rows.push(row);
  });

  return (
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
  );
}

export default Table;
