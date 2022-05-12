const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../db.js');
require('dotenv').config();
const { API_KEY, API } = process.env;
const axios = require('axios');

const getVideogames = async () => {
    try {
        const games = [];
        let url = `${API}?api_key=${API_KEY}`;
        for (let i = 1; i < 8; i++) {
            let pages = await axios.get(url);
            pages.data?.results.forEach((e) => {
                games.push({
                    id: e.id,
                    name: e.name,
                    background_image: e.background_image,
                    rating: e.rating,
                    genres: e.genres.map((gender) => gender.name),
                    platforms: e.platforms.map((platforms) => platforms.name),
                })
            })
            url = pages.data.next
        }
        return games;
    } catch (error) {
        console.log(error)
    }
};

const getDbGames = async () => {
    let dbGamesData = await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });

    let newDataGame = dbGamesData.map((e) => {
        return {
            id: e.id,
            name: e.name,
            rating: e.rating,
            background_image: e.background_image,
            genres: e.genres.map((e) => e.name),
            description: e.description,
            released: e.released,
            createdVideoGame: e.createdVideoGame,
            platforms: e.platforms,
        };
    });
    return newDataGame;
};

const getAllInfo = () => {
    try {
        let allInfo = Promise.all([getVideogames(), getDbGames()].then(
            (resultado) => {
                return [...resultado[0], ...resultado[1]];
            }
        ))
        return allInfo;
    } catch (error) {
        console.log(error);
    }
};

router.get('/videogames', async (req, res) => {
    const { name } = req.query;

    const allGames = await getAllInfo();
    if(name) {
        let gameName = allGames
        .filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 16);
        gameName.length
        ? res.status(200).json(gameName)
        : res.status(404).send("No existe el juego");
    } else {
        res.status(200).send(allGames);
    }
})



module.exports = router;