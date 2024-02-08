import React from "react";
import { useParams } from "react-router-dom";
import FormCloudinary from "../../components/FormCloudinary-R/FormCloudinary";
import "./AddExistingArtwork.scss";

function AddExistingArtwork() {
  const { id } = useParams();

  return (
    <div className="add-existing-artwork-container">
      <FormCloudinary
        title="Trouve ?"
        button="Valider"
        validated
        missing={false}
        nonExisting={false}
        params={id}
      />
    </div>
  );
}

export default AddExistingArtwork;
