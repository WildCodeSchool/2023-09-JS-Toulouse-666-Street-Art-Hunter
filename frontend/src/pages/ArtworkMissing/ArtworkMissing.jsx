import React from "react";
import FormCloudinary from "../../components/FormCloudinary-R/FormCloudinary";
import "./ArtworkMissing.scss";

function ArtworkMissing() {
  return (
    <div className="artwork-missing-container">
      <FormCloudinary
        title="Disparu ?"
        button="Valider"
        missing
        nonExisting={false}
        validated={false}
      />
    </div>
  );
}

export default ArtworkMissing;
