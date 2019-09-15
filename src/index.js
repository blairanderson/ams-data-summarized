import React from "react";
import ReactDOM from "react-dom";
import useLocalStorage from "./use-local-storage";
import Table from "./table";

import "./styles.css";

function App() {
  const [format, setFormat] = useLocalStorage("format-columns", false);
  const [dat, setDat] = useLocalStorage("amsdat", {});
  const [err, setErr] = React.useState(false);
  const [updated, setUpdated] = useLocalStorage("amsdat-updated", undefined);

  function parseJSON(str) {
    try {
      setDat(JSON.parse(str));
      // setUpdated(new Date());
    } catch (e) {
      setDat({});
      setUpdated(false);
      setErr(e);
    }
  }

  return (
    <div className="App">
      <h1>Amazon Advertising Historical CSV</h1>
      <h3>Paste your "XHR" response here to see some magic happen!</h3>
      <details className="container">
        <summary>instructions</summary>
        <div className="row">
          <p className="lead text-left col-6 mx-auto">
            I look at this chart everyday and love that it exists. This script
            will convert the underlying data into a CSV format.
          </p>
        </div>
      </details>
      {err && updated && (
        <div>
          <br />
          {err}
          Last updated at {updated}
        </div>
      )}
      <textarea
        onChange={e => {
          parseJSON(e.target.value);
        }}
        value={JSON.stringify(dat) !== "{}" ? JSON.stringify(dat) : ""}
        width={"100%"}
      />

      <label>
        <input
          checked={format}
          onChange={e => {
            console.log(e.target.checked);
            setFormat(e.target.checked);
          }}
          type="checkbox"
        />{" "}
        Format Table Data
      </label>
      {dat && dat.timeSeries && <Table format={format} dat={dat} />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
