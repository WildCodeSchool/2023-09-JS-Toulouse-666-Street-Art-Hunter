import React from "react";
import FormCloudinary from "../../components/FormCloudinary-R/FormCloudinary";
import "./AddExistingArtwork.scss";

function AddExistingArtwork() {
  return (
    <div className="add-existing-artwork-container">
      <FormCloudinary
        title="Trouve ?"
        button="Valider"
        validated
        missing={false}
        nonExisting={false}
      />
    </div>
  );
}

export default AddExistingArtwork;
