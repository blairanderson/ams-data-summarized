import React from "react";
import jsonexport from "jsonexport/dist";

export default function TableExport({ data, filename }) {
  function downloadCSV(event) {
    event.preventDefault();

    jsonexport(data, function(err, csv) {
      if (err) {
        alert(err);
        return console.error(err);
      }
      // CSV FILE
      const csvFile = new Blob([csv], { type: "text/csv" });
      // Download link
      const downloadLink = document.createElement("a");
      // File name
      downloadLink.download = filename;
      // We have to create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);
      // Make sure that the link is not displayed
      downloadLink.style.display = "none";
      // Add the link to your DOM
      document.body.appendChild(downloadLink);
      // Lanzamos
      downloadLink.click();
    });
  }

  return (
    <button
      className="btn btn-sm btn-outline-info"
      onClick={downloadCSV}
      title={`Export ${filename}`}
    >
      Export CSV
    </button>
  );
}
