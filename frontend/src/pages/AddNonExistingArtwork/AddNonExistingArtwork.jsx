import React from "react";
import FormCloudinary from "../../components/FormCloudinary-R/FormCloudinary";

function AddNonExistingArtwork() {
  return (
    <div>
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
