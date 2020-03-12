import React from "react";

export default function() {
  return (
    <div>
      <h1 className="tc">Amazon Advertising Historical CSV</h1>
      <h3 className="tc">
        browser-based tool to normalize your Advertising Dashboard data
      </h3>
      <p
        style={{
          maxWidth: "500px",
          textAlign: "center",
          margin: "auto",
          lineHeight: "22px",
          fontSize: "20px"
        }}
      >
        <strong>Why?</strong>
        The Advertising (AMS) dashboard has data that is not easily available
        from the API or reports exporter.
      </p>
      <details className="container">
        <summary>instructions</summary>
        <ol>
          <li>
            Visit{" "}
            <a
              href="https://advertising.amazon.com/cm/campaigns"
              target="_blank"
            >
              https://advertising.amazon.com/cm/campaigns
            </a>
          </li>
          <li>Right-Click on the page and "inspect" to show DevTools</li>
          <li>
            Select the <strong>Network</strong> tab on top, then select{" "}
            <strong>XHR</strong> tab on the sub-header menu.
          </li>
          <li>
            inside the "filter" text field, type "campaigns" and refresh the
            page with <code>ctrl + r</code>. (On a mac <code>⌘+r</code>)
          </li>
          <li>
            (1) line should show up! click it and view the "response" section
          </li>
          <li>
            Paste your XHR response data into this form and see some magic
            happen!
          </li>
        </ol>

      </details>
    </div>
  );
}
