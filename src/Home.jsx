import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

import InfoBox from "./InfoBox/InfoBox";
import Map from "./Map/Map";
import Table from "./Table/Table";
import LineGraph from "./LineGraph/LineGraph";
import Vaccine from "./Vaccine/Vaccine";

function Home() {
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");
  const [flag, setFlag] = useState(
    "https://disease.sh/assets/img/flags/bd.png"
  );

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setTableData(data);
          setCountries(countries);
          setMapCountries(data);
        })
        .catch((error) => console.log(error));
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
        setFlag(data.countryInfo.flag);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App container">
      <div className="row">
        <div className="col-md-8 my-3 p-2">
          {/*This is the title and the dropdown part*/}
          <header className="row d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-danger">COVID-19 TRACKER</h2>

            <div>
              <img src={flag} alt="" className="flag" />
              <FormControl className="app__dropdown">
                <Select
                  variant="outlined"
                  value={country}
                  onChange={onCountryChange}
                >
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </header>
          {/*Info boxes part*/}
          <h5 className="text-success my-2">
            Updated at :{`${new Date(countryInfo.updated)}`}
          </h5>
          <div className="row">
            <InfoBox
              active={casesType === "cases"}
              isYellow={true && casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              textColor="text-warning"
              cases={numeral(countryInfo.todayCases).format("0.0a")}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
            <InfoBox
              active={casesType === "recovered"}
              isGreen={true && casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recoverd"
              textColor="text-success"
              cases={numeral(countryInfo.todayRecovered).format("0.0a")}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              textColor="text-danger"
              cases={numeral(countryInfo.todayDeaths).format("0.0a")}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
          </div>
          <div className="row">
            <Map
              casesType={casesType}
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
        </div>
        <div className="col-md-4 p-2">
          <div className="row p-2 mx-2">
            <Table countries={tableData} />
          </div>
          <div className="row my-3">
            <div className="mx-auto">
              {/*Line Graph*/}
              <LineGraph casesType={casesType} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2 className="text-center mx-auto my-2 text-primary">
          Vaccine's News
        </h2>
        <Vaccine />
      </div>
    </div>
  );
}

export default Home;
