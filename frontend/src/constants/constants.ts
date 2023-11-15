//---------------API---------------
const API_ROOTDIR = "http://localhost:5000/api/";
// USER
export const API_LOGIN = API_ROOTDIR + "auth/login";
export const API_LOGOUT = API_ROOTDIR + "auth/logout";
export const API_SIGNUP = API_ROOTDIR + "auth/signup";
export const API_UPDATE_USER = API_ROOTDIR + "auth/update/";
export const API_GET_USER = API_ROOTDIR + "auth/user/";
export const API_GET_USERS = API_ROOTDIR + "auth/users";
export const API_CHECK_COOKIES = API_ROOTDIR + "auth/cookies";
// CATEGORY
export const API_CATEGORY = API_ROOTDIR + "category";
// ARTICLE
export const API_ARTICLE = API_ROOTDIR + "article";
// COMMENT
export const API_COMMENT = API_ROOTDIR + "comment";

//---------------RESPONSE---------------
// ERROR MESSAGE
export const INPUT_EMPTY = "Un ou plusieurs champs sont vides";
export const DIFFERENT_PASSWORD =
  "Les 2 mots de passes ne sont pas identiques !";
export const COMMENT_EMPTY =
  "Le contenu du commentaire ne doit pas être vide !";
export const ARTICLE_BAD_REQUEST =
  "Il y a un problème avec cet article, veuillez réessayez !";

//---------------NAVIGATION---------------
export const NAV_LINKS = [
  {
    href: "/",
    name: "Accueil",
  },
  {
    href: "/article",
    name: "Articles",
  },
  {
    href: "/contact",
    name: "Contact",
  },
  {
    href: "/account",
    name: "Compte",
  },
];

//---------------GLOBAL---------------
export const BLOG_NAME = "Sonvic'o Blog";

export const PITCH_PRESENTATION =
  "Passionné par le développement d'application mais pas que, j'ai décidé de mettre en pratique mes compétences pour pouvoir partager mes autres passions.";

// MODAL
export const alertTextDeleteComment =
  "Êtes-vous sûr de vouloir supprimer ce commentaire ?";
