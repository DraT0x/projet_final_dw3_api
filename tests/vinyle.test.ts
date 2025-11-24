import insertUrlParams from "inserturlparams";
import { customDeepCompare } from "jet-validators/utils";

import VinyleRepo from "@src/repos/VinyleRepo";

import { VINYLE_NON_TROUVE } from "@src/services/VinyleService";

import HttpStatusCodes from "@src/common/constants/HttpStatusCodes";
import { ValidationError } from "@src/common/util/route-errors";

import Paths from "./common/Paths";
import { parseValidationErr, TRes } from "./common/util";
import { agent } from "./support/setup";
import { IVinyle, Vinyle } from "@src/models/Vinyle";

/******************************************************************************
                               Constants
******************************************************************************/

// Données bidon pour les vinyles (simulacre de GET)
const DB_VINYLES: IVinyle[] = [
  {
    id: "1",
    titre: "Wish You Were Here",
    artiste: "Pink Floyd",
    chansons: [
      { nom: "Shine On You Crazy Diamond (I-V)", duree: 600 },
      { nom: "Welcome to the Machine" },
      { nom: "Have a Cigar" },
      { nom: "Wish You Were Here" },
      { nom: "Shine On You Crazy Diamond (VI-IX)" },
    ],
    genres: ["Rock Progressif"],
    date_parution: new Date(1975, 9, 12),
    prix_achat: 15,
    possession: false,
  },
  {
    id: "2",
    titre: "In the Court of the Crimson King",
    artiste: "King Crimson",
    chansons: [
      { nom: "21st Century Schizoid Man", duree: 444 },
      { nom: "I Talk to the Wind" },
      { nom: "Epitaph" },
      { nom: "MoonChild" },
      { nom: "The Court of the Crimson King" },
    ],
    genres: ["Rock Progressif"],
    date_parution: new Date(1969, 10, 10),
    possession: true,
  },
  {
    id: "3",
    titre: "Beloved! Paradise! Jazz!?",
    artiste: "McKinley Dixon",
    chansons: [
      { nom: "Hanif Reads Toni" },
      { nom: "Sun, I Rise" },
      { nom: "Mezzanine Tippin’" },
      { nom: "Run, Run, Run" },
      { nom: "Live! From The Kitche Table" },
      { nom: "Tyler, Forever" },
      { nom: "Dedicated To Tar Feather" },
      { nom: "The Story So Far (Interlude)" },
      { nom: "The Story So Far" },
      { nom: "Beloved! Paradise! Jazz!?" },
    ],
    genres: ["Hip-Hop", "Jazz"],
    date_parution: new Date(2023, 4, 26),
    possession: true,
  },
] as const;

// Don't compare 'id' and 'created' cause those are set dynamically by the
// database
const compareUserArrays = customDeepCompare({
  onlyCompareProps: [
    "titre",
    "artiste",
    "chansons",
    "genres",
    "possession",
  ]
});


const mockify = require("@jazim/mock-mongoose");
/******************************************************************************
                                 Tests
  IMPORTANT: Following TypeScript best practices, we test all scenarios that 
  can be triggered by a user under normal circumstances. Not all theoretically
  scenarios (i.e. a failed database connection). 
******************************************************************************/

describe("vinyleRouter", () => {
  // Extraire tous les vinyles
  describe(`'GET:${Paths.Vinyle.GetAll}'`, () => {
    // Succès
    it(
      'doit retourner un JSON avec tous les auteurs et un code de ' +
        `of '${HttpStatusCodes.OK}' si réussi.`,
      async () => {
        // Préparer le simulacre de Mongoose
        const data = [...DB_VINYLES];
        mockify(Vinyle).toReturn(data, 'find');
        const res: TRes<{ auteurs: IVinyle[] }> = await agent.get(
          Paths.Vinyle.GetAll,
        );
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(compareUserArrays(res.body.auteurs, DB_VINYLES)).toBeTruthy();
      },
    );
  });


  // Tester l'ajout d'un vinyle
  describe(`'POST:${Paths.Vinyle.Add}'`, () => {
    // Ajout réussi
    it(
      `doit retourner le code '${HttpStatusCodes.CREATED}' si la ` +
        "transaction est réussie",
      async () => {
        const vinyle: IVinyle = {
          id: "12",
          titre: "The Dark Side of the Moon",
          artiste: "Pink Floyd",
          chansons: [
            { nom: "Speak To Me" },
            { nom: "Breathe (In The Air)" },
            { nom: "On The Run" },
            { nom: "Time" },
            { nom: "The Great Gig In The Sky" },
            { nom: "Money" },
            { nom: "Us And Them" },
            { nom: "Any Colour You Like" },
            { nom: "Brain Damage" },
            { nom: "Eclipse" },
          ],
          genres: ["Rock Progressif", "Rock Psychadelique"],
          date_parution: new Date("1973-03-01T00:00:00.000Z"),
          possession: true,
        };
        // Préparer le simulacre de Mongoose
        mockify(Vinyle).toReturn(vinyle, "save");
        const res = await agent.post(Paths.Vinyle.Add).send({ vinyle });
        expect(res.status).toBe(HttpStatusCodes.CREATED);
      }
    );

    // Paramètre manquant
    it(
      "doit retourner un JSON avec les erreurs et un code de " +
        `'${HttpStatusCodes.BAD_REQUEST}' si un paramètre est ` +
        "manquant.",
      async () => {
        const res: TRes = await agent
          .post(Paths.Vinyle.Add)
          .send({ vinyle: null });
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe("Vinyle requis");
      }
    );
  });

  // Mise à jour d'un vinyle
  describe(`'PUT:${Paths.Vinyle.Update}'`, () => {
    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la mise à jour ` +
        "est réussie.",
      async () => {
        const vinyle = DB_VINYLES[1];
        vinyle.chansons = [
          { nom: "21st Century Schizoid Man", duree: 444 },
          { nom: "I Talk to the Wind", duree: 365 },
          { nom: "Epitaph", duree: 527 },
          { nom: "MoonChild", duree: 733 },
          { nom: "The Court of the Crimson King", duree: 565 },
        ];

        // Préparer le simulacre de Mongoose
        mockify(Vinyle).toReturn(vinyle, "findOne").toReturn(vinyle, "save");

        const res = await agent.put(Paths.Vinyle.Update).send({ vinyle });
        expect(res.status).toBe(HttpStatusCodes.OK);
      }
    );

    // Vinyle non trouvée
    it(
      "doit retourner un JSON avec erreur  " +
        `'${VINYLE_NON_TROUVE}' et un code de ` +
        `'${HttpStatusCodes.NOT_FOUND}' si l'id n'est pas trouvé.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Vinyle).toReturn(null, "findOne");
        const vinyle = {
            id: "0",
            titre: "null",
            artiste: "null",
            chansons: [],
            genres: [],
            date_parution: new Date(0, 0, 0),
            possession: false,
          },
          res: TRes = await agent.put(Paths.Vinyle.Update).send({ vinyle });

        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(VINYLE_NON_TROUVE);
      }
    );
  });

  // Supprimer la réservation
  describe(`'DELETE:${Paths.Vinyle.Delete}'`, () => {
    const getPath = (id: string) =>
      insertUrlParams(Paths.Vinyle.Delete, { id });

    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la ` +
        "suppression est réussie.",
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Vinyle)
          .toReturn(DB_VINYLES[1], "findOne")
          .toReturn(DB_VINYLES[1], "findOneAndRemove");
        const id = DB_VINYLES[1].id,
          res = await agent.delete(getPath(id));
        expect(res.status).toBe(HttpStatusCodes.OK);
      }
    );

    // Réservation non trouvée
    it(
      "doit retourner un JSON avec erreur " +
        `'${VINYLE_NON_TROUVE}' et un code de  ` +
        `'${HttpStatusCodes.NOT_FOUND}' si la réservation est introuvable.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Vinyle).toReturn(null, "findOne");

        const res: TRes = await agent.delete(getPath("-1"));
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(VINYLE_NON_TROUVE);
      }
    );
  });
});
