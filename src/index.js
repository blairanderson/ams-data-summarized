import React from "react";
import ReactDOM from "react-dom";
import useLocalStorage from "./use-local-storage";
import Table from "./table";
import Instructions from "./instructions";

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
      
      <Instructions />
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
