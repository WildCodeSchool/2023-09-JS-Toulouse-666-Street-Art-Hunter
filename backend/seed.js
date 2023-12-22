/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    queries.push(
      database.query(
        `INSERT INTO artwork (image, longitude, latitude, adress, description, date_published, ask_to_archived, is_archived, is_validate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          "https://blog.artsper.com/wp-content/uploads/2013/08/ObeyGiant_Vhils-1.jpg",
          "43.59620372139065",
          "1.4552773682148064",
          "8 Rue de Valenciennes",
          "C'est beau !",
          "2022/01/01",
          0,
          0,
          1,
        ]
      )
    );

    queries.push(
      database.query(
        `INSERT INTO avatar_image (name, objective, img_url) VALUES (?, ?, ?)`,
        [
          "Regular dude",
          "Unlock by default",
          "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/118947646/original/9fb85fe56953295c5592270439d44b477c742ca5/create-a-pixel-art-charakter-for-you.png",
        ]
      )
    );

    queries.push(
      database.query(
        `INSERT INTO user (name, description, email, password, score, is_admin, is_banned, selected_avatar, border) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          "Arthur",
          "J'aime les prototypes",
          "Arthur@me.com",
          "password",
          1000,
          0,
          0,
          "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/118947646/original/9fb85fe56953295c5592270439d44b477c742ca5/create-a-pixel-art-charakter-for-you.png",
          "#FFFFFF",
        ]
      )
    );

    queries.push(
      database.query(
        `insert into photo (image, is_validated, user_id, artwork_id) values (?, ?, ?, ?)`,
        [
          "https://parisjetaime.com/data/layout_image/33841_Paris%20Attitude%20street%20art%20(C)%20Antoine%20Buchet.jpg",
          1,
          1,
          1,
        ]
      )
    );

    queries.push(
      database.query(
        `insert into artist (name, description, image) values (?, ?, ?)`,
        [
          "Pikasaut",
          "peintre depuis ma plus tendre enfance",
          "httpmozillafirefox",
        ]
      )
    );
    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
