// Erreur de build fixé par Claude.AI - 2025-12-10
import JetonService from '@src/services/JetonService';
import { IUtilisateur } from '@src/models/Utilisateur';
import { IReq, IRes } from './common/types';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Générer un jeton.
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function generateToken(req: IReq, res: IRes) {
    if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Utilisateur Login Requis (courriel, motDePasse)' })
      .end();
    return;
  }

  const utilisateurLogin = req.body.utilisateurLogin as IUtilisateur;
  const token = await JetonService.generateToken(utilisateurLogin);
  return res.send({ token: token });
}

/******************************************************************************
                            Export default
******************************************************************************/

export default {
  generateToken,
} as const;