import React from "react";
import { useHistory } from "react-router-dom";
import "./Vaccine.style.css";

function VaccineCard({ vaccine, index }) {
  let history = useHistory();
  const handleClick = async (e) => {
    await localStorage.setItem("vaccine", JSON.stringify(vaccine));
    history.push("/vaccine");
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 my-2">
      <div className="card text-center vaccine-card">
        <div className="card-body" id={index} onClick={handleClick}>
          <h5 className="text-success">{vaccine.candidate}</h5>
          <small className="text-primary">
            <strong>Trial Phase :</strong> {vaccine.trialPhase}
          </small>
          <p className="text-left mt-2">
            <strong>Institution:</strong> {vaccine.institutions.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VaccineCard;
