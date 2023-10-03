"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreated = exports.authSuccess = exports.userNotFound = exports.incorrectToken = exports.emailAlreadyUse = exports.incorrectCredential = exports.emailNotFound = void 0;
// RESPONSE ERROR MESSAGE
exports.emailNotFound = "Impossible de trouver l'e-mail en paramètre";
exports.incorrectCredential = "Identifiant/mot de passe incorrect";
exports.emailAlreadyUse = "Adresse e-mail déjà utilisé";
exports.incorrectToken = "Token d'authentification invalide";
exports.userNotFound = "Impossible de trouver cet utilisateur";
// RESPONSE SUCCESS MESSAGE
exports.authSuccess = "Authentification réussi avec succès";
exports.userCreated = "Utilisateur créé avec succès";
