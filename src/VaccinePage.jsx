import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";

function VaccinePage() {
  let vaccine = JSON.parse(localStorage.getItem("vaccine"));
  let history = useHistory();

  console.log(vaccine);

  return (
    <div className="vaccine_page">
      <div className="container p-4">
        {vaccine.candidate ? (
          <div>
            <Link to="/home" class="btn-lg btn-primary goBack-button">
              Go Back
            </Link>
            <h2 className="text-success text-center">{vaccine.candidate}</h2>
            <p>
              <strong>Sponsors : </strong>
              {vaccine.sponsors.join(",")}
            </p>
            <p>
              <strong>Trial Phase : </strong>
              {vaccine.trialPhase}
            </p>
            <p>
              <strong>Institutions : </strong>
              {vaccine.institutions.join(",")}
            </p>
            <p>
              <strong>Funding : </strong>
              {vaccine.funding.join(",")}
            </p>

            <p>
              <strong>Details : </strong>
              {vaccine.details}
            </p>
          </div>
        ) : (
          <h4>No data to see</h4>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default VaccinePage;
