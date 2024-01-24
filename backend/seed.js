const {
  userData,
  photoData,
  artworkData,
  artistData,
  avatarImageData,
  avatarUserData,
} = require("./seedItem");
// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    // const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    const userQueryPromises = userData.map((user) => {
      return database.query(
        `INSERT INTO user (name, description, email, hashed_password, score, is_admin, is_banned, selected_avatar, border) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.name,
          user.description,
          user.email,
          user.hashed_password,
          user.score,
          user.is_admin,
          user.is_banned,
          user.selected_avatar,
          user.border,
        ]
      );
    });

    const artworkQueryPromises = artworkData.map((artwork) => {
      return database.query(
        `INSERT INTO artwork (image, longitude, latitude, adress, description, date_published, ask_to_archived, is_archived, is_validate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          artwork.image,
          artwork.longitude,
          artwork.latitude,
          artwork.adress,
          artwork.description,
          artwork.date_published,
          artwork.ask_to_archived,
          artwork.is_archived,
          artwork.is_validate,
        ]
      );
    });

    const artistQueryPromises = artistData.map((artist) => {
      return database.query(
        `INSERT INTO artist (name, description, image) VALUES (?, ?, ?)`,
        [artist.name, artist.description, artist.image]
      );
    });

    const avatarImageQueryPromises = avatarImageData.map((avatarImage) => {
      return database.query(
        `INSERT INTO avatar_image (name, objective, img_url) VALUES (?, ?, ?)`,
        [avatarImage.name, avatarImage.objective, avatarImage.img_url]
      );
    });

    const photoQueryPromises = photoData.map((photo) => {
      return database.query(
        `INSERT INTO photo (image, is_validated, user_id, artwork_id) VALUES (?, ?, ?, ?)`,
        [photo.image, photo.is_validated, photo.user_id, photo.artwork_id]
      );
    });

    // queries.push(
    //   database.query(
    //     `INSERT INTO artwork (image, longitude, latitude, adress, description, date_published, ask_to_archived, is_archived, is_validate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //     [
    //       "https://blog.artsper.com/wp-content/uploads/2013/08/ObeyGiant_Vhils-1.jpg",
    //       "43.59620372139065",
    //       "1.4552773682148064",
    //       "8 Rue de Valenciennes",
    //       "C'est beau !",
    //       "2022/01/01",
    //       0,
    //       0,
    //       1,
    //     ]
    //   )
    // );

    // queries.push(
    //   database.query(
    //     `INSERT INTO avatar_image (name, objective, img_url) VALUES (?, ?, ?)`,
    //     [
    //       "Regular dude",
    //       "Unlock by default",
    //       "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/118947646/original/9fb85fe56953295c5592270439d44b477c742ca5/create-a-pixel-art-charakter-for-you.png",
    //     ]
    //   )
    // );

    // queries.push(
    //   database.query(
    //     `INSERT INTO user (name, description, email, hashed_password, score, is_admin, is_banned, selected_avatar, border) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //     [
    //       "Arthur",
    //       "J'aime les prototypes",
    //       "a@a.com",
    //       "$argon2id$v=19$m=65536,t=5,p=1$+S3Gb/M9gk60MWLsMtJB4A$I0/8gdRdQVhnsImLjdDNK2Uy7xdKnUnDvCaM7r2nYE0",
    //       1000,
    //       0,
    //       0,
    //       "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/118947646/original/9fb85fe56953295c5592270439d44b477c742ca5/create-a-pixel-art-charakter-for-you.png",
    //       "#FFFFFF",
    //     ]
    //   )
    // );

    // queries.push(
    //   database.query(
    //     `insert into photo (image, is_validated, user_id, artwork_id) values (?, ?, ?, ?)`,
    //     [
    //       "https://parisjetaime.com/data/layout_image/33841_Paris%20Attitude%20street%20art%20(C)%20Antoine%20Buchet.jpg",
    //       1,
    //       1,
    //       1,
    //     ]
    //   )
    // );

    // queries.push(
    //   database.query(
    //     `insert into artist (name, description, image) values (?, ?, ?)`,
    //     [
    //       "Pikasaut",
    //       "peintre depuis ma plus tendre enfance",
    //       "httpmozillafirefox",
    //     ]
    //   )
    // );
    /* ************************************************************************* */

    const allPromises = [
      ...userQueryPromises,
      ...artworkQueryPromises,
      ...avatarImageQueryPromises,
      ...photoQueryPromises,
      ...artistQueryPromises,
    ];

    await Promise.all(allPromises);

    const avatarUserQueryPromises = avatarUserData.map((avatarUser) => {
      return database.query(
        `INSERT INTO avatar_user (user_id, avatar_image_id) VALUES (?, ?)`,
        [avatarUser.user_id, avatarUser.avatar_image_id]
      );
    });

    await Promise.all(avatarUserQueryPromises);

    // Wait for all the insertion queries to complete
    // await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
