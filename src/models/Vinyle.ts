import mongoose, { Schema, model } from 'mongoose';

export interface IChanson {
  nom: string;
  duree?: number; // durée en secondes
}

export interface IVinyle {
  id: string;
  urlImage: string;
  titre: string;
  artiste: string;
  chansons: IChanson[];
  genres: string[];
  date_parution: Date;
  prix_achat?: number;
  possession: boolean;
}

const ChansonSchema = new Schema<IChanson>({
  nom: {
    type: String,
    required: [true, 'Le nom de la chanson est obligatoire !'],
  },
  duree: { type: Number, required: false },
});

const VinyleSchema = new Schema<IVinyle>({
  id: { type: String, required: false },
  urlImage: { type: String, required: true },
  titre: { type: String, required: true },
  artiste: { type: String, required: true },
  chansons: {
    type: [ChansonSchema],
    validate: {
      validator: function (v : IChanson[]) {
        return v.length > 0;
      },
      message: 'Il doit y avoir au moins une chanson sur le vinyle',
    },
  },
  genres: { type: [String], require: true },
  date_parution: { type: Date, required: true },
  prix_achat: { type: Number, required: false },
  possession: { type: Boolean, required: true },
});

mongoose.pluralize(null);

export const Vinyle = model<IVinyle>('vinyles', VinyleSchema);
