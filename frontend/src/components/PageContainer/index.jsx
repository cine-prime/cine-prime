import React from "react";
import "./style.css";
import CinePrimeNavbar from "../CinePrimeNavbar";

export default function PageContainer(props) {
  return (
    <div className={"pageContainer"}>
      {props.navbar}
      {props.children}
    </div>
  );
}
