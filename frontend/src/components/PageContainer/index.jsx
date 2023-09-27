import React from "react";
import styles from "./style.css?inline";

export default function PageContainer(props) {
  return <div className={styles.pageContainer}>{props.children}</div>;
}
