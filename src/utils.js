import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import InfoBox from "./InfoBox";
import { Typography } from "@material-ui/core";

/**
 * Circle Show in MAP
 */
export const casesTypeColors = {
  cases: { hex: "#f16f00", multiplier: 200 },
  recovered: { hex: "#488c00", multiplier: 150 },
  deaths: { hex: "#fb4443", multiplier: 150 },
};

export const showDataOnMap = (data, casesType) => {
  return data.map((country) => {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div>
            <Typography className="fixPad" color="textSecondary">
              {country.country}
            </Typography>
            <div
              style={{
                backgroundImage: `url(${country.countryInfo.flag})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                height: "70px",
              }}
            ></div>
            <Typography className="fixPad" color="textSecondary">
              Country Wise Total:{" "}
            </Typography>

            <div
              className={casesType == "cases" ? "cases bold" : "unbold"}
              style={{ color: casesTypeColors["cases"]["hex"] }}
            >
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div
              className={casesType == "recovered" ? "recovered bold" : "unbold"}
              style={{ color: casesTypeColors["recovered"]["hex"] }}
            >
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div
              className={casesType == "deaths" ? "deaths bold" : "unbold"}
              style={{ color: casesTypeColors["deaths"]["hex"] }}
            >
              Death: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
};

export const printNumeralStat = (stat) => {
  return stat ? "+" + numeral(stat).format("0,0a") : '0';
};

/**Data Table Sorted */
export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
