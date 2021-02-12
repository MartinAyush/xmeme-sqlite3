const knex = require('./knex')

function createMeme(meme){
    return knex("memes").insert(meme);
};

function getAllMemes(){
    return knex("memes").select("*");
};

function getOneMeme(id){
    return knex("memes").select("*").where("id", id);
}

module.exports = {
    createMeme, 
    getAllMemes,
    getOneMeme
}