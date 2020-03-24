import React from "react";
import {
  numberWithCommas,
  numberToDollar,
  colors,
  numberToPercent
} from "./utilities";

export default function Summary({ summary }) {
  const toDollars = numberToDollar(2);
  const toPercent = numberToPercent(2);

  const spend = toDollars(summary.spend.millicents / 100000.0);
  const sales = toDollars(summary.sales.millicents / 100000.0);

  return (
    <div className="container-fluid">
      <div className="row">
        <Card title="Spend" value={spend} color="primary" icon="calendar" />

        <Card title="Sales" value={sales} color="success" icon="dollar-sign" />

        <Card
          title="ACoS"
          value={toPercent(summary.acos)}
          color="secondary"
          icon="dollar-sign"
        />

        <Card
          title="Impressions"
          value={numberWithCommas(summary.impressions)}
          color="warning"
          icon="calendar"
        />

        <Card
          title="Clicks"
          value={numberWithCommas(summary.clicks)}
          color="danger"
          icon="dollar-sign"
        />

        <Card
          title="CTR %"
          value={toPercent(summary.ctr)}
          color="info"
          icon="dollar-sign"
        />
      </div>
    </div>
  );
}

function Card({ color, title, value, icon }) {
  return (
    <CardLayout color={color} icon={icon}>
      <div
        className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}
      >
        {title}
      </div>
      <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
    </CardLayout>
  );
}

function CardLayout({ color, icon, children }) {
  const hex = colors[color];

  return (
    <div className="col-xl-2 col-sm-4 mb-4">
      <div
        style={{ borderLeft: `8px solid ${hex}` }}
        className="card shadow h-100 py-2"
      >
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">{children}</div>
            <div className="col-auto">
              <i className={`fas ${icon} fa-2x text-gray-300`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
