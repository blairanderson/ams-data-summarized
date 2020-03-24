import React from "react";
import ReactDOM from "react-dom";
import useLocalStorage from "./use-local-storage";
import TimeSeries from "./TimeSeries";
import Summary from "./Summary";
import Instructions from "./instructions";
import { isEmpty } from "./utilities";

import "./styles.css";

function App() {
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
      <Instructions detailsOpen={isEmpty(dat)} />
      {err && updated && (
        <div>
          <br />
          {err}
          Last updated at {updated}
        </div>
      )}

      {dat && dat.timeSeries && dat.summary ? (
        <button
          onClick={e => {
            setDat({});
          }}
        >
          Clear Ad Data
        </button>
      ) : (
        <textarea
          style={{ width: "100%", textAlign: "center" }}
          onChange={e => {
            parseJSON(e.target.value);
          }}
          placeholder="Paste the 'XHR' response here!"
          value={JSON.stringify(dat) !== "{}" ? JSON.stringify(dat) : ""}
          width={"100%"}
        />
      )}
      {dat && dat.summary && <Summary summary={dat.summary} />}
      {dat && dat.timeSeries && <TimeSeries timeSeries={dat.timeSeries} />}
      {false && (
        <textarea
          style={{ width: "100%", height: "100vh" }}
          value={JSON.stringify(dat, null, 4)}
        />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
