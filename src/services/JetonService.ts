// **** Variables **** //

import { IUtilisateur } from '@src/models/Utilisateur';
import UtilisateurService from './UtilisateurService';
import jwt from 'jsonwebtoken';
import ENV from '@src/common/constants/ENV';

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé';

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUtilisateur} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 */
async function generateToken(utilisateur: IUtilisateur): Promise<string> {
  const utilisateurBD = (await UtilisateurService.getAll()).filter(
    (utilisateur) => utilisateur.courriel === utilisateur.courriel,
  )[0];
  if (utilisateurBD && utilisateurBD.motDePasse === utilisateur.motDePasse) {
    return jwt.sign(utilisateur.courriel, ENV.Jwtsecret as string);
  } else {
    return '';
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;