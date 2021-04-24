> ** Coronavirus Cases data not reflecting on React - Leaflet Map and **
> ** LineGraph while changing Country **

> ** Map.js ** code as follows -



import React from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from './utils'


function Map({ countries, casesType, center, zoom }) {

return (
<div className="map">
<MapContainer
     center={center}
     zoom={zoom}
     doubleClickZoom={true}
     scrollWheelZoom={true}
>

     <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     {showDataOnMap(countries, casesType)}

</MapContainer>
</div>
);
}

export default Map;

> ** Data Rendering Code **


export const casesTypeColors = {
cases: { hex: "#f16f00", multiplier: 200, },
recovered: { hex: "#488c00", multiplier: 150, },
deaths: { hex: "#fb4443", multiplier: 150, },
};

export const showDataOnMap = (data, casesType) => {

return data.map((country) => {

return <Circle
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

          <Typography className="fixPad" color="textSecondary">{country.country}</Typography>
          <div style={{ backgroundImage: `url(${country.countryInfo.flag})`, backgroundPosition: "center center", backgroundSize: 'cover', height: '70px' }}>
          </div>
          <Typography className="fixPad" color="textSecondary">Country Wise Total: </Typography>

          <div className={casesType == "cases" ? "cases bold" : "unbold"} style={{ color: casesTypeColors['cases']['hex'] }}>Cases: {numeral(country.cases).format('0,0')}</div>
          <div className={casesType == "recovered" ? "recovered bold" : "unbold"} style={{ color: casesTypeColors['recovered']['hex'] }}>Recovered: {numeral(country.recovered).format('0,0')}</div>
          <div className={casesType == "deaths" ? "deaths bold" : "unbold"} style={{ color: casesTypeColors['deaths']['hex'] }}>Death: {numeral(country.deaths).format('0,0')}</div>
     </div>


</Popup>

</Circle>;

});

};

> * For better understand you can see CodeSandBox * 
> https://codesandbox.io/s/busy-cori-rvpju?file=/src/App.js



