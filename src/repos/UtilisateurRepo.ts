import { IUtilisateur, Utilisateur } from '@src/models/Utilisateur';

/******************************************************************************
                                Fonctions
******************************************************************************/
/****************************************
                 GET
*****************************************/
/**
 * Extraire tous les utilisateurs.
 *
 * @returns {IUtilisateur[]} Un tableau de tous les utilisateurs
 */
async function getAll(): Promise<IUtilisateur[]> {
  return await Utilisateur.find().sort('courriel');
}

export default {
  getAll,
};