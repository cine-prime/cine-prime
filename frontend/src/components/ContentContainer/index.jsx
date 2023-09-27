import { Container } from "react-bootstrap";
import React from "react";

import styles from "./styles.css?inline";

export default function ContentContainer({ children }) {
  return <div className={styles.content_container}>{children}</div>;
}
