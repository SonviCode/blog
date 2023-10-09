"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDeleted = exports.categoryCreated = exports.userCreated = exports.authSuccess = exports.adminOnly = exports.categoryNotFound = exports.userNotFound = exports.incorrectToken = exports.emailAlreadyUse = exports.incorrectCredential = exports.emailNotFound = void 0;
// RESPONSE ERROR MESSAGE
exports.emailNotFound = "Impossible de trouver l'e-mail en paramètre";
exports.incorrectCredential = "Identifiant/mot de passe incorrect";
exports.emailAlreadyUse = "Adresse e-mail déjà utilisé";
exports.incorrectToken = "Token d'authentification invalide";
exports.userNotFound = "Impossible de trouver cet utilisateur";
exports.categoryNotFound = "Impossible de trouver cette catégorie";
exports.adminOnly = "Cette page est réservé aux administrateurs";
// RESPONSE SUCCESS MESSAGE
exports.authSuccess = "Authentification réussi avec succès";
exports.userCreated = "Utilisateur créé avec succès";
exports.categoryCreated = "Catégorie créé avec succès";
exports.categoryDeleted = "Catégorie supprimé avec succès";
