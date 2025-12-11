import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IReq, IRes } from './common/types';
import UtilisateurService from '@src/services/UtilisateurService';

/******************************************************************************
                                Fonctions
******************************************************************************/

async function getAll(_: IReq, res: IRes) {
  const utilisateurs = await UtilisateurService.getAll();
  return res.status(HttpStatusCodes.OK).json({ utilisateurs });
}

export default {
  getAll,
};