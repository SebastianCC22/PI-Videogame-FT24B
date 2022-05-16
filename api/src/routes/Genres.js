const { Router } = require('express');
const router = Router();
const { Genero } = require('../db.js');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

router.get('/', async (req, res, next) => {
    try{
        const get = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);

        // console.log(get)

        const genres = get.data.results.map((e) => {
            const obj = {
                name: e.name
            }
            return obj;
        });


        // Genero.bulkCreate(genres)

        genres.forEach((e) => {
            Genero.findOrCreate({ where: { name: e.name }})
        })

        // console.log(genres)

        const allGenres = await Genero.findAll();
        res.json(allGenres)
    } catch(error) {
        console.log(error);
    }
})

module.exports = router;