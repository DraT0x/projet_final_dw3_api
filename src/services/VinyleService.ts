import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

import VinyleRepo from '@src/repos/VinyleRepo';
import { IVinyle } from '@src/models/Vinyle';

/******************************************************************************
                                Constants
******************************************************************************/
export const VINYLE_NON_TROUVE = 'Vinyle non trouvé';

/******************************************************************************
                                Fonctions
******************************************************************************/
function getAll(): Promise<IVinyle[]> {
  return VinyleRepo.getAll();
}

function getByArtiste(artiste: string): Promise<IVinyle[] | null> {
  return VinyleRepo.getByArtiste(artiste);
}

function getByID(id: string): Promise<IVinyle | null> {
  return VinyleRepo.getByID(id);
}

function getByTitre(titre: string): Promise<IVinyle[] | null> {
  return VinyleRepo.getByTitre(titre);
}

function ajouterVinyle(vinyle: IVinyle): Promise<void> {
  return VinyleRepo.ajouterVinyle(vinyle);
}

async function updateVinyle(vinyle: IVinyle): Promise<void> {
  const persists = await VinyleRepo.getByID(vinyle.id);

  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VINYLE_NON_TROUVE);
  }

  return VinyleRepo.updateVinyle(vinyle);
}

async function supprimerVinyle(id: string): Promise<void> {
  const persists = await VinyleRepo.getByID(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VINYLE_NON_TROUVE);
  }

  return VinyleRepo.supprimerVinyle(id);
}
/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  getByArtiste,
  getByID,
  getByTitre,
  ajouterVinyle,
  updateVinyle,
  supprimerVinyle,
} as const;
