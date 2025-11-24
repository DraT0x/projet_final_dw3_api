import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IReq, IRes } from './common/types';
import VinyleService from '@src/services/VinyleService';
import { IVinyle } from '@src/models/Vinyle';

/******************************************************************************
                                Fonctions
******************************************************************************/

async function getAll(_: IReq, res: IRes) {
  const vinyles = await VinyleService.getAll();
  return res.status(HttpStatusCodes.OK).json({ vinyles });
}

async function getByArtiste(req: IReq, res: IRes) {
  const { nomArtiste } = req.params;
  const vinyles = await VinyleService.getByArtiste(nomArtiste as string);
  return res.status(HttpStatusCodes.OK).json({ vinyles });
}

async function getByID(req: IReq, res: IRes) {
  const { idVinyle } = req.params;
  const vinyle = await VinyleService.getByID(idVinyle as string);
  return res.status(HttpStatusCodes.OK).json({ vinyle });
}

async function getByTitre(req: IReq, res: IRes) {
  const { titreVinyle } = req.params;
  const vinyles = await VinyleService.getByTitre(titreVinyle as string);
  return res.status(HttpStatusCodes.OK).json({ vinyles });
}

async function ajouterVinyle(req: IReq, res: IRes) {
  const { vinyle } = req.body;
  await VinyleService.ajouterVinyle(vinyle as IVinyle);
  return res.status(HttpStatusCodes.CREATED).end();
}

async function updateVinyle(req: IReq, res: IRes) {
  const { vinyle } = req.body;
  await VinyleService.updateVinyle(vinyle as IVinyle);
  res.status(HttpStatusCodes.OK).end();
}

async function supprimerVinyle(req: IReq, res: IRes) {
  const { id } = req.params;
  await VinyleService.supprimerVinyle(id as string);
  res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  getByArtiste,
  getByID,
  getByTitre,
  ajouterVinyle,
  updateVinyle,
  supprimerVinyle,
} as const;
