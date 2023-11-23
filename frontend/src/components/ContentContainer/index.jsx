import { Container } from "react-bootstrap";
import React from "react";

import "./styles.css";

export default function ContentContainer({ children }) {
  return <div className={"content_container"} style={{overflow:'auto'}}>{children}</div>;
}
