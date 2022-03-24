import React from "react";

import styles from "./key-value-table.module.scss";

export function KeyValueTable({ title, cButton, children, className = "" }) {
  return (
    <div className={`${styles.table} ${className}`}>
      <div className={styles.title}>
        <div className={styles.formRow}>
          <div className={styles.titleSide}>
            <h4 className={styles.title}>{title}</h4>
          </div>
          <div className={styles.cbuttonSide}>
            <h4 className={styles.title}>{cButton}</h4>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}

export function Row({ label, children, className = "" }) {
  return (
    <div className={`${styles.row} ${className}`}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.value}>{children}</div>
    </div>
  );
}
