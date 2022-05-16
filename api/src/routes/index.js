const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const routeGames = require('./Games');
const routeGenres = require('./Genres');
const routeGame = require('./Game')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', routeGames)
router.use('/generos', routeGenres)
router.use('/videogame', routeGame)

module.exports = router;
