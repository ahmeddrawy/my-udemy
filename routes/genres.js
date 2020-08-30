const express = require('express');
const router = express.Router();


const genres = [{'id' : 1 , "name":"comedy","movies":20} ,{'id' : 2 , "name":"horror","movies":14} ];

router.get('/',(req,res)=>{
    res.send(genres);
});
router.get('/:id',(req,res)=>{
    const id = parseInt( req.params.id);
    const genre = genres.find((element)=>element.id ===id);
    if(!genre){
        res.status(404).send('unavailable genre');
        return;
    }
    res.send(genre);
});
module.exports = router;