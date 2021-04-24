//rfce - react functional component explorer to auto generate the code frame
import React from "react";
import "./InfoBox.css";
import { printNumeralStat } from "./utils";
import { Card, CardContent, Typography, image } from "@material-ui/core";

function InfoBox({ country, title, cases, total, color, ...props }) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${props.active && title.toLowerCase()} }` }>
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title">{title}</Typography>

        {/* +120k Number of Cases */}
        <h2 className="infoBox__cases" style={{ color: color }}>
          {printNumeralStat(cases)}{" "}
          <Typography className="infoBox__today" color="textSecondary">
            <b>Today</b>
          </Typography>
        </h2>

        {/* 1.2M Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {printNumeralStat(total)} <b>Total</b>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
