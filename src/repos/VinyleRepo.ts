import { IVinyle, Vinyle } from '@src/models/Vinyle';

/******************************************************************************
                                Fonctions
******************************************************************************/
/****************************************
                 GET
*****************************************/
/**
 * Extraire tous les vinyles.
 *
 * @returns {IVinyle[]} Un tableau de tous les vinyles
 */
async function getAll(): Promise<IVinyle[]> {
  return await Vinyle.find().sort('titre');
}

/**
 * Extraire un/des vinyle(s) à partir d'un artiste.
 *
 * @param {string} artiste - Nom de l'artiste du/des vinyle(s) à extraire
 *
 * @returns {IVinyle[]} - Un/des vinyles si trouvé(s)
 */
async function getByArtiste(artiste: string): Promise<IVinyle[] | null> {
  const vinyles = await Vinyle.find({
    artiste: artiste,
  });
  return vinyles;
}

/**
 * Extraire un vinyle.
 *
 * @param {string} id - ID du vinyle à extraire
 *
 * @returns {IVinyle} - Un vinyle si trouvé
 */
async function getByID(id: string): Promise<IVinyle | null> {
  const vinyle = await Vinyle.findOne({
    _id: id,
  });

  return vinyle;
}

/**
 * Extraire un/des vinyle(s) à partir d'un titre.
 *
 * @param {string} titre - Nom du titre du/des vinyle(s) à extraire
 *
 * @returns {IVinyle[]} - Un/des vinyles si trouvé(s)
 */
async function getByTitre(titre: string): Promise<IVinyle[] | null> {
  const vinyles = await Vinyle.find({
    titre: titre,
  });
  return vinyles;
}

/****************************************
                 POST
*****************************************/
/**
 * Ajouter un vinyle.
 *
 * @param {IVinyle} vinyle - Vinyle à ajouter
 */

async function ajouterVinyle(vinyle: IVinyle): Promise<void> {
  const nouveauVinyle = new Vinyle(vinyle);
  await nouveauVinyle.save();
}

/****************************************
                  PUT
*****************************************/
/**
 * Mettre à jour un vinyle.
 *
 * @param {IVinyle} vinyle - Vinyle à modifier
 */
async function updateVinyle(vinyle: IVinyle): Promise<void> {
  const vinyleAUpdate = await Vinyle.findOne({ _id: vinyle.id });
  if (vinyleAUpdate === null) throw new Error('Vinyle non trouvé');

  vinyleAUpdate.titre = vinyle.titre;
  vinyleAUpdate.artiste = vinyle.artiste;
  vinyleAUpdate.chansons = vinyle.chansons;
  vinyleAUpdate.genres = vinyle.genres;
  vinyleAUpdate.date_parution = vinyle.date_parution;
  vinyleAUpdate.prix_achat = vinyle.prix_achat;
  vinyleAUpdate.possession = vinyle.possession;

  await vinyleAUpdate.save();
}

/****************************************
                  DELETE
*****************************************/
async function supprimerVinyle(id: string): Promise<void> {
  await Vinyle.deleteOne({ id: id });
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