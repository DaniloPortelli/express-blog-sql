//Richiamo le funzionalità di express
const express = require("express");

//Creo variabile che rappresenta l'istanza di un router, al fine di gestire le rotte in modo isolato 
const router = express.Router();

//Richiamo l'array di oggetti presente nel file posts
const posts = require("../data/posts")

//Richiamo le funzioni dal file controller, uso destructuring
const {index, show, store, update, modify, destroy} = require("../controller/postController");

//applico le funzioni alle diverse rotte
router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.patch("/:id", modify);
router.delete("/:id", destroy);

//Esportazione delle rotte di router
module.exports = router;






