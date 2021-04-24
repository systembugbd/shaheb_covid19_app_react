import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";
import "./Table.css";
import "./InfoBox.css";
import Table from "./Table";
import { sortData, casesTypeColors } from "./utils";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import logo from './global.png';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryFlag, setCountryFlag] = useState("");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([23.8103, 90.4125]);
  const [mapZoom, setMapZoom] = useState(6);
  const [mapCountries, setMpCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  // STATE = how to write a variale in REACT<<<<

  //https://disease.sh/v3/covid-19/countries

  // USEEFFECT = Runs a piece of code
  // based on a given condition

  useEffect(() => {
    //initial data load at once only when reload
    const loadInitalData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          // setTableData(data);
          setCountryInfo(data);
        });
    };

    loadInitalData(); //calling load InitalData async func

    // The Code Inside here will run once
    // When the component loads and not agin
    // async ->send a requrest to server and await for it. do something whith in the time

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const allCountry = data.map((country) => (
            {
            name: country.country,
            value: country.countryInfo.iso2,
            
            }

         ));

          const sortedData = sortData(data);
          setTableData(sortedData);

          setCountries(allCountry);
          setMpCountries(data);
    
        });
    }; // getCountriesData() End

    getCountriesData(); //calling getCountriesData async func
  }, []);

  //Dropdown on Change get Country code
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setCountryFlag(data.countryInfo.flag)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });

    //https://disease.sh/v3/covid-19/all

    //https://disease.sh/v3/covid-19/countries
  };

  // console.log(tableData, 'I am from table data');
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER APP { countryFlag? <img src={countryFlag} className="countryFlag" alt={country} width="45" /> : <img src={logo} className="countryFlag" alt={country} width="45" /> }</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop trhough all the countries and show a dropdown list of the */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Header */}
        {/* Title + Select Input Dropdown fields */}

        <div className="app__stats">
         
          <InfoBox
             active={casesType === "cases"}
            onClick={(e)=>setCasesType("cases")}
            country={country}
            title="Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            color={casesTypeColors['cases']['hex']}
          />

          <InfoBox
          active={casesType === "recovered"}
           onClick={(e)=>setCasesType("recovered")}
            country={country}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            color={casesTypeColors['recovered']['hex']}
          />

          <InfoBox
            active={casesType === "deaths"}
            onClick={(e)=>setCasesType("deaths")}
            country={country}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            color={casesTypeColors['deaths']['hex']}
          />

          {/* Info Box title="Coronavirus Cases */}
          {/* Info Box title=""recovered*/}
          {/* Info Box title=""Death*/}
        </div>

      <div className="app__maps">
        <h3 className={casesType}>Coronavirus {casesType}</h3>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

        {/* Map */}
      </div>

      <Card className="app__right">
        <CardContent>
          {/* {console.log('I am table data', tableData)} */}
          <h3>Live Country by Cases</h3>
          <hr />
          <Table counteryData={tableData} />
          {/* Table */}

          <h3 className="lineGraph__title">Worldwide New Cases</h3>
          <LineGraph casesType="cases" country={country} />
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
