"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCreated = exports.commentDeleted = exports.articleCreated = exports.categoryDeleted = exports.categoryCreated = exports.userLogout = exports.userCreated = exports.authSuccess = exports.adminOnly = exports.articleNotFound = exports.categoryNotFound = exports.userNotFound = exports.incorrectToken = exports.emailAlreadyUse = exports.incorrectCredential = exports.emailNotFound = void 0;
//---------------RESPONSE ERROR MESSAGE---------------
exports.emailNotFound = "Impossible de trouver l'e-mail en paramètre !";
exports.incorrectCredential = "Identifiant/mot de passe incorrect !";
exports.emailAlreadyUse = "Adresse e-mail déjà utilisé !";
exports.incorrectToken = "Token d'authentification invalide !";
exports.userNotFound = "Impossible de trouver cet utilisateur !";
exports.categoryNotFound = "Impossible de trouver cette catégorie !";
exports.articleNotFound = "Impossible de trouver cet article !";
exports.adminOnly = "Cette page est réservé aux administrateurs !";
//---------------RESPONSE SUCCESS MESSAGE---------------
exports.authSuccess = "Authentification réussi avec succès !";
exports.userCreated = "Utilisateur créé avec succès !";
exports.userLogout = "Utilisateur déconnecté avec succès !";
exports.categoryCreated = "Catégorie créé avec succès !";
exports.categoryDeleted = "Catégorie supprimé avec succès !";
exports.articleCreated = "Article créé avec succès !";
exports.commentDeleted = "Commentaire supprimé avec succès !";
exports.commentCreated = "Commentaire créé avec succès !";
