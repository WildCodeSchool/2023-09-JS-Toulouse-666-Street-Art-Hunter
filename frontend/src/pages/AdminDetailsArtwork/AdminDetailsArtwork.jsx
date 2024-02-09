import { useLoaderData, useParams } from "react-router-dom";
import "./AdminDetailsArtwork.scss";
import GeolocIcon from "../../../../backend/public/assets/icons/geoloc-icon.png";
import AstroBoy from "../../../../backend/public/assets/avatars/astro-boy.png";
import Title from "../../components/TitleRed-R/Title";
import LinkAdmin from "../../components/LinkAdmin/LinkAdmin";

function AdminDetailsArtwork() {
  // ********************* STATE *********************
  const dataArtworkById = useLoaderData();

  const { id } = useParams();

  // ********************* LOGIQUE *********************
  const { data } = dataArtworkById;

  const currentAddress = data.adress;

  const currentDate = data.date_published;

  const dateNoHour = currentDate.split("T")[0];
  const dateSplitted = dateNoHour.split("-");
  const normalDate = `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`;

  const currentImage = data.image;

  const currentDescription = data.description;

  const publisherUser = data.name;

  // ********************* RENDER *********************
  return (
    <div className="main-container-admin-details-artwork">
      <div className="preview-main">
        <div className="preview-container">
          <img className="preview-image" src={currentImage} alt="artwork" />
        </div>
      </div>

      <div className="address-container">
        <div className="section-text">
          <Title title="Adresse:" />
          <p className="address-text">{currentAddress}</p>
        </div>
        <div className="section-icon">
          <img
            className="address-image"
            src={GeolocIcon}
            alt="geolocalition icon"
          />
        </div>
      </div>

      <div className="published-container">
        <Title title="Publie par:" />
        <div className="user-container">
          <img src={AstroBoy} alt="user-avatar" />
          <p className="user-name">
            {publisherUser &&
              publisherUser.charAt(0).toUpperCase() + publisherUser.slice(1)}
          </p>
        </div>
        <p className="current-date">Le {normalDate}</p>
      </div>

      <div className="description-container">
        <Title title="Description:" />
        <p className="description-text">{currentDescription}</p>
      </div>

      <div className="btn-container">
        <LinkAdmin
          lien={`/admin/admin-details-artwork/option/${id}`}
          textLink="Modifier"
          nameClass="link-admin b"
        />
      </div>
    </div>
  );
}

export default AdminDetailsArtwork;

export const dataArtwork = async (req) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  try {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const { id } = req.params;
    const response = await fetch(`${apiUrl}/api/artworks/publishers/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    if (token && user) {
      const { id: userId } = JSON.parse(user);
      const photoByUser = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/photos/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userPhotos = await photoByUser.json();

      return { data, userPhotos };
    }

    return { data };
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    throw error;
  }
};
