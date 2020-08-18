import React, { useState, useEffect } from "react";
import "./Vaccine.style.css";
import VaccineCard from "./VaccineCard";
import VaccinePage from "../VaccinePage";

function Vaccine() {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const fetchVaccineData = async () => {
      await fetch("https://disease.sh/v3/covid-19/vaccine")
        .then((response) => response.json())
        .then((data) => {
          setVaccines(data.data);
        })
        .catch((err) => console.log(err));
    };
    fetchVaccineData();
  }, []);

  return (
    <div className="row">
      {vaccines.map((vaccine, index) => (
        <VaccineCard vaccine={vaccine} index={index} key={index} />
      ))}
    </div>
  );
}

export default Vaccine;
