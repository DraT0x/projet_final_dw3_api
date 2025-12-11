export default {
  Base: '/api',
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
  Utilisateurs: {
    Base: '/utilisateurs',
    GetAll: '/',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Vinyle: {
    Base: '/vinyles',
    GetAll: '/',
    GetByID: '/:idVinyle',
    GetByArtiste: '/artiste/:nomArtiste',
    GetByTitre: '/titre/:titreVinyle',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
} as const;
