import React from "react";
import "./loading.scss";

export const Loading: React.SFC = () => (
  <div className="loading-container">
    <div className="lds-roller" data-testid="spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
