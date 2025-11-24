export default {
  Base: "/api",
  Vinyle: {
    Base: "/vinyles",
    GetAll: "/",
    GetByID: "/:idVinyle",
    GetByArtiste: "/artiste/:nomArtiste",
    GetByTitre: "/titre/:titreVinyle",
    Add: "/",
    Update: "/",
    Delete: "/:id",
  },
} as const;
