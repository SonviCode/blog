// API
const API_ROOTDIR = "http://localhost:5000/api/";
// USER
export const API_LOGIN = API_ROOTDIR + "auth/login";
export const API_SIGNUP = API_ROOTDIR + "auth/signup";
export const API_GET_USER = API_ROOTDIR + "auth/user/";
export const API_CHECK_COOKIES = API_ROOTDIR + "auth/cookies";
// CATEGORY
export const API_ADD_CATEGORY = API_ROOTDIR + "category";

// ERROR MESSAGE RESPONSE
export const INPUT_EMPTY = "Un ou plusieurs champs sont vides";
export const incorrectCredential = "Identifiant/mot de passe incorrect";

// RESPONSE SUCCESS MESSAGE
export const authSuccess = "Authentification réussi avec succès";

export const NAV_LINKS = [
  {
    href: "/",
    name: "Accueil",
  },
  {
    href: "/contact",
    name: "Contact",
  },
  {
    href: "/about",
    name: "À propos",
  },
  {
    href: "/account",
    name: "Connexion",
  },
];

export const LIST_CATEGORY = [
  {
    name: "Montagne",
    img: "/IMG_1371.JPG",
    color: "#E5EFE6",
  },
  {
    name: "Code",
    img: "/IMG_1371.JPG",
    color: "#DEF0FE",
  },
  {
    name: "Voyage",
    img: "/IMG_1371.JPG",
    color: "#DFDCFC",
  },
  {
    name: "Van",
    img: "/IMG_1371.JPG",
    color: "#FEE0DD",
  },
  {
    name: "Jardin",
    img: "/IMG_1371.JPG",
    color: "#FDE6D5",
  },
];

export const BLOG_NAME = "Sonvic'o Blog";

export const PITCH_PRESENTATION =
  "Passionné par le développement d'application mais pas que, j'ai décidé de mettre en pratique mes compétences pour pouvoir partager mes autres passions.";
