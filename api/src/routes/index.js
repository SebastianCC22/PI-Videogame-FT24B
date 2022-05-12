const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const routeGames = require('./Games');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', routeGames)

module.exports = router;
