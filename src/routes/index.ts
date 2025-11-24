import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import VinyleRoutes from './VinyleRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IVinyle, Vinyle } from '@src/models/Vinyle';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ** Add VinyleRouter ** //
interface VinyleRequest {
  vinyle: IVinyle;
}
// ** Validation d'un vinyle ** //
function validateVinyle(req: Request, res: Response, next: NextFunction) {
  const body = req.body as VinyleRequest;
  
  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Vinyle requis' })
      .end();
    return;
  }
  
  if (body.vinyle === null || body.vinyle === undefined) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Vinyle requis' })
      .end();
    return;
  }
  
  const nouveauVinyle = new Vinyle(body.vinyle);
  const error = nouveauVinyle.validateSync();
  
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

// Init router
const VinyleRouter = Router();


VinyleRouter.get(Paths.Vinyle.GetAll, VinyleRoutes.getAll);
VinyleRouter.get(Paths.Vinyle.GetByArtiste, VinyleRoutes.getByArtiste);
VinyleRouter.get(Paths.Vinyle.GetByID, VinyleRoutes.getByID);
VinyleRouter.get(Paths.Vinyle.GetByTitre, VinyleRoutes.getByTitre);
VinyleRouter.post(Paths.Vinyle.Add, validateVinyle, VinyleRoutes.ajouterVinyle);
VinyleRouter.put(Paths.Vinyle.Update, VinyleRoutes.updateVinyle);
VinyleRouter.delete(Paths.Vinyle.Delete, VinyleRoutes.supprimerVinyle);


// Add VinyleRouter
apiRouter.use(Paths.Vinyle.Base, VinyleRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;