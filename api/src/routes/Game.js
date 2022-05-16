const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db.js');
require('dotenv').config();
const axios =require('axios');
const { API_KEY } = process.env;



router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    if (id.includes('-')) {
            try{
            const gameCreated = await getDbGames();
            const gameId = gameCreated.filter((e) => e.id === id)

            if(gameId > 0){
                return res.status(200).json(gameId)
            }
            else {
                return res.status(404).send("No se encontró nada");
            }
        } catch {
            console.log("Otro texto");
        }
    } else {
        try{
            const getApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

            const result = {
                id: getApi.data.id,
                name: getApi.data.name,
                background_image: getApi.data.background_image,
                rating: getApi.data.rating,
                released: getApi.data.rating,
                description: getApi.data.description,
                genres: getApi.data.genres.map((e) => e.name),
                platforms: getApi.data.parent_platforms.map((e) => {
                    return {
                        name: e.platform.name
                    }
                }),
            }
            // const id = result.filter(e => e.id == id)

            // if (id){
            //     return res.status(200).json(result);
            // } else {
            //     return res.status(404).send("Este ID No coincide con ningún ID")
            // }
            return res.status(200).json(result);

        } catch {
            console.log("Texto Debug")
        }
    }
})

// router.get('/:id', async function(req, res){
//     const { id } = req.params;
//     const arrApiInfo = [];
    
//         if(id.includes('-')){
//             try{
//                 const dbInf = await getDbGames();
//                 const filtro = dbInf.filter(e=>e.id == id)
//                 if(filtro.length > 0){
//                     return res.status(200).send(filtro)
//                 }else return res.status(404).send("No se encuentra este r id");   
//             }catch(error){
//                 console.log(error);
//             }
//         }else {
//            try{
//             const info = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
//             arrApiInfo.push(info.data)
//             console.log(info)
//             const apiData = arrApiInfo.map(e => {
//                 return {
//                     id: e.id,
//                     name: e.name,
//                     background_image: e.background_image,
//                     description: e.description,
//                     released: e.released,
//                     rating: e.rating,
//                     platforms: e.platforms.map(e => {
//                         return {
//                             name: e.platform.name
//                         }
//                     }),
//                 }
//             })
//                 const game = apiData.filter(e => e.id == id)

//                 if(game){
//                     return res.status(200).json(game);
//                 }else {
//                     return res.status(404).send("No se encuentra  o este id");
//                 }
//            }catch(error){   
//                console.log(error)
//            }
           
//         }

  
// });

router.post('/', async (req, res, next) => {
    
        let {
            id,
            name,
            description,
            released,
            rating,
            genres,
            platforms,
            dateOfLaunch,
        } = req.body

        const gameCreated = await Videogame.create({
            id,
            name,
            description,
            released,
            rating,
            genres,
            platforms,
            dateOfLaunch,
        })

        res.send(gameCreated)
        
})

module.exports = router;