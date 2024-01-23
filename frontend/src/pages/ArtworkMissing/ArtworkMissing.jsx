import React from "react";
import FormCloudinary from "../../components/FormCloudinary-R/FormCloudinary";

function ArtworkMissing() {
  return (
    <FormCloudinary
      title="Disparu ?"
      button="Valider"
      missing
      nonExisting={false}
      validated={false}
    />
  );
}

export default ArtworkMissing;
