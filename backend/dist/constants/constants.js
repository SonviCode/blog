"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARTICLE_CREATED = exports.CATEGORY_CREATED = exports.COMMENT_CREATED = exports.articleCreated = exports.categoryUpdated = exports.categoryDeleted = exports.categoryCreated = exports.userLogout = exports.userCreated = exports.authSuccess = exports.INVALID_PAYLOAD = exports.SIGNUP_BAD_REQUEST = exports.ARTICLE_BAD_REQUEST = exports.CATEGORY_BAD_REQUEST = exports.COMMENT_BAD_REQUEST = exports.COMMENT_NOT_FOUND = exports.ARTICLE_NOT_FOUND = exports.CATEGORY_NOT_FOUND = exports.USER_NOT_FOUND = exports.INCORRECT_TOKEN = exports.INCORRECT_CREDENTIAL = exports.EMAIl_ALREADY_USE = exports.EMAIL_NOT_FOUND = void 0;
//---------------RESPONSE ERROR MESSAGE---------------
//email
exports.EMAIL_NOT_FOUND = "Impossible de trouver l'e-mail en paramètre !";
exports.EMAIl_ALREADY_USE = "Adresse e-mail déjà utilisé !";
//login
exports.INCORRECT_CREDENTIAL = "Identifiant/mot de passe incorrect !";
exports.INCORRECT_TOKEN = "Token d'authentification invalide !";
//404 not found
exports.USER_NOT_FOUND = "Impossible de trouver cet utilisateur !";
exports.CATEGORY_NOT_FOUND = "Impossible de trouver cette catégorie !";
exports.ARTICLE_NOT_FOUND = "Impossible de trouver cet article !";
exports.COMMENT_NOT_FOUND = "Aucun commentaire disponible pour cet article";
//400
exports.COMMENT_BAD_REQUEST = "Il y a un problème avec ce commentaire, veuillez réessayez !";
exports.CATEGORY_BAD_REQUEST = "Il y a un problème avec cette catégorie, veuillez réessayez !";
exports.ARTICLE_BAD_REQUEST = "Il y a un problème avec cet article, veuillez réessayez !";
exports.SIGNUP_BAD_REQUEST = "problème de création du compte, veuillez réessayez !";
exports.INVALID_PAYLOAD = "Données invalides, veuillez réessayez !";
//---------------RESPONSE SUCCESS MESSAGE---------------
exports.authSuccess = "Authentification réussi avec succès !";
exports.userCreated = "Utilisateur créé avec succès !";
exports.userLogout = "Utilisateur déconnecté avec succès !";
exports.categoryCreated = "Catégorie créé avec succès !";
exports.categoryDeleted = "Catégorie supprimé avec succès !";
exports.categoryUpdated = "Catégorie mise à jour avec succès !";
exports.articleCreated = "Article créé avec succès !";
//201
exports.COMMENT_CREATED = "Commentaire créé avec succès !";
exports.CATEGORY_CREATED = "Category créé avec succès !";
exports.ARTICLE_CREATED = "Article créé avec succès !";
