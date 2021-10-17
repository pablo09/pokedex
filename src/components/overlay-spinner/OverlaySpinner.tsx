import React from "react";
import styles from "./OverlaySpinner.module.css";

interface OverlaySpinnerProps {
  opened: boolean;
}

export const OverlaySpinner = (props: OverlaySpinnerProps) => {
  if (!props.opened) {
    return <></>;
  }

  return (
    <div className={styles.overlay}>
      <div className="d-flex justify-content-center text-center">
        <div
          className={["spinner-border text-primary text-center", styles.loader].join(" ")}
          role="status"
        >
        </div>
      </div>
    </div>
  );
};
