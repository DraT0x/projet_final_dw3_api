import UtilisateurRepo from '@src/repos/UtilisateurRepo';
import { IUtilisateur } from '@src/models/Utilisateur';

/******************************************************************************
                                Fonctions
******************************************************************************/
function getAll(): Promise<IUtilisateur[]> {
  return UtilisateurRepo.getAll();
}

export default {
  getAll,
};