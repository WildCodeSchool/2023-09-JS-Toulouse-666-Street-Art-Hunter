import React from "react";
import FormCloudinary from "../../components/FormCloudinary-R/FormCloudinary";
import "./AddNonExistingArtwork.scss";

function AddNonExistingArtwork() {
  return (
    <div className="add-non-existing-artwork-container">
      <FormCloudinary
        title="Nouvelle ?"
        button="Ajouter"
        missing={false}
        nonExisting
        validated
      />
    </div>
  );
}

export default AddNonExistingArtwork;
