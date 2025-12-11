import mongoose, { Schema, model } from 'mongoose';

/******************************************************************************
                                  Types
******************************************************************************/

export interface IUtilisateur {
  id: string;
  courriel: string;
  motDePasse: string;
}

const UtilisateurSchema = new Schema<IUtilisateur>({
  courriel: { type: String, required: [true, 'Le courriel est requis']},
  motDePasse: { type: String, required: [true, 'Le mot de passe est requis']},
});

mongoose.pluralize(null);

export const Utilisateur = model<IUtilisateur>('utilisateurs', UtilisateurSchema);