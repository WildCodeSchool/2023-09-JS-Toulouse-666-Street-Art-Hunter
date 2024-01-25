const artworkData = [
  {
    image:
      "https://blog.artsper.com/wp-content/uploads/2013/08/ObeyGiant_Vhils-1.jpg",
    longitude: "43.5967165399473",
    latitude: "1.4531289189245216",
    adress: "2 Sq. Boulingrin",
    description: "Toute cette couleur, c'est incroyable !",
    date_published: "2022/10/12",
    ask_to_archived: 0,
    is_archived: 0,
    is_validate: 1,
  },
  {
    image:
      "https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/edito_banniere/public/thumbnails/image/visiter_toulouse_fresque_street_art.jpg?itok=gNQa-Uoc",
    longitude: "43.59494619213161",
    latitude: "1.4536899841499504",
    adress: "5 Sq. Boulingrin",
    description: "C'est beau !",
    date_published: "2022/01/01",
    ask_to_archived: 0,
    is_archived: 0,
    is_validate: 1,
  },
  {
    image:
      "https://image.over-blog.com/vppe63IKNr9YQKb6VhvAV5ypd5I=/filters:no_upscale()/image%2F1406669%2F20230517%2Fob_e0b323_street-art-toulouse-swed.jpg",
    longitude: "43.595109572714044",
    latitude: "1.4555986919348944",
    adress: "5 Rue Jean Aillet",
    description: "C'est beau !",
    date_published: "2024/01/03",
    ask_to_archived: 1,
    is_archived: 0,
    is_validate: 1,
  },
  {
    image:
      "https://www.toulouse-tournages.fr/sites/www.toulouse-tournages.fr/files/styles/top_banniere/public/thumbnails/image/decor_tournage_rue_neuve_toulouse.jpg?itok=mcjMBwAF",
    longitude: "43.59620372139065",
    latitude: "1.4552773682148064",
    adress: "8 Rue de Valenciennes",
    description: "LoL, Il y A pA d'oeuVre D'art iCi !",
    date_published: "2022/01/01",
    ask_to_archived: 0,
    is_archived: 0,
    is_validate: 0,
  },
  {
    image:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706108272/Avatar/a50ae9cf-dcc6-4b52-8ded-59f6ae704776_gci64j.jpg",
    longitude: "43.60568091093529",
    latitude: "1.4491256754932784",
    adress: "18 All. Jean Jaurès",
    description: "C'est un mur !",
    date_published: "2022/01/01",
    ask_to_archived: 0,
    is_archived: 0,
    is_validate: 0,
  },
  {
    image:
      "https://3.bp.blogspot.com/-v3QXxWDaV4g/WyaK66UcrcI/AAAAAAAAQN4/Ibd1RhTqA0QTlAvSnBsFX1NV_ychGM6WgCLcBGAs/s1600/01.JPG",
    longitude: "43.605918557771076",
    latitude: "1.4560548575085943",
    adress: "23Bis Bd Pierre-Paul Riquet",
    description: "C'est beau !",
    date_published: "2022/01/01",
    ask_to_archived: 1,
    is_archived: 0,
    is_validate: 1,
  },
];

const userData = [
  {
    name: "Arthur",
    description: "J'aime les prototypes",
    email: "Arthur@mail.com",
    hashed_password:
      "$argon2id$v=19$m=65536,t=5,p=1$gchAbeLDP59sJZs35SWYqg$sAsiLe6qaxjX2wAzvHusVMb/fmkCY0huxibzvOyj0UM",
    score: 1000,
    is_admin: 0,
    is_banned: 0,
    selected_avatar:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/6_qomins.png",
    border: "#FFFFFF",
  },
  {
    name: "Adrien",
    description: "Où sont les genies ?",
    email: "adrien@mail.com",
    hashed_password:
      "$argon2id$v=19$m=65536,t=5,p=1$gchAbeLDP59sJZs35SWYqg$sAsiLe6qaxjX2wAzvHusVMb/fmkCY0huxibzvOyj0UM",
    score: 0,
    is_admin: 0,
    is_banned: 0,
    selected_avatar:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/6_qomins.png",
    border: "#FFFFFF",
  },
];

const photoData = [
  {
    image:
      "https://blog.artsper.com/wp-content/uploads/2013/08/ObeyGiant_Vhils-1.jpg",
    is_validated: 1,
    user_id: 1,
    artwork_id: 1,
  },
  {
    image:
      "https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/edito_banniere/public/thumbnails/image/visiter_toulouse_fresque_street_art.jpg?itok=gNQa-Uoc",
    is_validated: 1,
    user_id: 1,
    artwork_id: 2,
  },
  {
    image:
      "https://image.over-blog.com/vppe63IKNr9YQKb6VhvAV5ypd5I=/filters:no_upscale()/image%2F1406669%2F20230517%2Fob_e0b323_street-art-toulouse-swed.jpg",
    is_validated: 0,
    user_id: 1,
    artwork_id: 3,
  },
  {
    image:
      "https://lemagduchat.ouest-france.fr/images/dossiers/2023-06/chat-cinema-061213.jpg",
    is_validated: 0,
    user_id: 2,
    artwork_id: 1,
  },
];

const artistData = [
  {
    name: "Pikasaut",
    description: "peintre depuis ma plus tendre enfance",
    image:
      "https://www.leparisien.fr/resizer/bnnSrYFOVVinao-z2OqWWFdD1sM=/622x804/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/IIYYRKR3HVGI3G7KRQ6CGSRG3E.jpg",
  },
  {
    name: "Banksy",
    description:
      "L'énigmatique artiste street art, fusionne satire sociale et créativité visuelle pour questionner le statu quo.",
    image:
      "https://img.20mn.fr/U7hhSUkXTQuwQUHfNL0LVA/768x492_two-men-are-sitting-in-front-of-a-famous-graffiti-of-british-street-artist-banksy-painted-on-a-wall",
  },
  {
    name: "Miss Van",
    description:
      "La talentueuse street artiste française, émerveille les rues du monde entier avec son art distinctif. Connu pour ses œuvres féminines envoûtantes.",
    image:
      "https://i.pinimg.com/1200x/48/95/92/489592fe38ac2a3a11e252cbcb2f7c7b.jpg",
  },
];

const avatarImageData = [
  {
    name: "Blue Hair Girl",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104116/Avatar/20_fpmygb.png",
  },
  {
    name: "Hypno Guy",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104116/Avatar/19_jkiohs.jpg",
  },
  {
    name: "Regular Dude",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/18_tfxij9.png",
  },
  {
    name: "Melting clocks",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/16_zmevda.jpg",
  },
  {
    name: "No Connection Dino",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/17_mlwsjn.jpg",
  },
  {
    name: "AHHHHH !",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/14_pqsz3w.png",
  },
  {
    name: "Red Is Sus",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/13_wqoqog.png",
  },
  {
    name: "Comfy heart",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/12_mzlkk1.png",
  },
  {
    name: "Poaching Ball",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/10_cvbacc.jpg",
  },
  {
    name: "Glitch Thing",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/11_jq2l0p.jpg",
  },
  {
    name: "Skull",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/9_ees7rw.jpg",
  },
  {
    name: "Prideful Knight",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/8_tn8op6.jpg",
  },
  {
    name: "Mosaic Panda",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/4_uw0s3k.jpg",
  },
  {
    name: "Martian",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/7_zsxnbg.png",
  },
  {
    name: "Pixelized Artist",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/3_mw8gpi.jpg",
  },
  {
    name: "Rockin Unicorn",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/5_jt8svf.jpg",
  },
  {
    name: "Evrything is fine !",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/6_qomins.png",
  },
  {
    name: "Staring frog",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/2_czdtia.jpg",
  },
  {
    name: "Painting with pixels",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104114/Avatar/1_ntes7e.jpg",
  },
  {
    name: "Mina Losa",
    objective: "Unlock by default",
    img_url:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/15_k81nt0.png",
  },
];

const avatarUserData = [];

for (let i = 1; i <= userData.length; i += 1) {
  for (let y = 1; y <= avatarImageData.length; y += 1) {
    avatarUserData.push({
      avatar_image_id: y,
      user_id: i,
    });
  }
}

module.exports = {
  artworkData,
  artistData,
  avatarImageData,
  avatarUserData,
  photoData,
  userData,
};
