import React from "react";
import "./InfoBox.style.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, active, textColor, total, ...props }) {
  return (
    <div className={`col-md-4 col-sm-6 my-2`}>
      <Card
        onClick={props.onClick}
        className={`${active && "info--border"} ${
          (props.isGreen && "border--green") ||
          (props.isYellow && "border--yellow")
        }`}
      >
        <CardContent>
          <Typography className="text-secondary">{title}</Typography>
          <h4 className={`${textColor}`}>+{cases}</h4>
          <Typography className="text-secondary">{total} total</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
