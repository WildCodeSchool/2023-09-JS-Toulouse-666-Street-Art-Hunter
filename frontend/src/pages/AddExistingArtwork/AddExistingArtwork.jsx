import React from "react";
import FormCloudinary from "../../components/FormCloudinary-R/FormCloudinary";

function AddExistingArtwork() {
  return (
    <div>
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
