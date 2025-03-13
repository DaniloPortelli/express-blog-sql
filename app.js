//variabile per richiamare le funzionalità di express
const express = require("express");

const connection = require("./data/posts_db")

//Variabile per creare l'istanza di express
const app = express();

//Importo il middleware che mi consente di inviare un messaggio 
//di errore qualora venga cercata una rotta inesistente
const notFound = require("./middleware/notFound");

//importo il middleware che mi consente di rilevare errori e restituire 
//un messaggio appropriato
const errorHandler = require("./middleware/errorsHandler");

//Variabile per porta di ascolto del server
const port = 3000;

//Importazione delle rotte dalla cartella routers
const postsRouter = require("./routers/posts");
const errorsHandler = require("./middleware/errorsHandler");

//funzione per registrare in express i body-parser che vogliamo utilizzare,
//ovvero delle funzioni che aiutano il server a decodificare il request body
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("hello")
// });

//utilizzo le rotte del file router
app.use("/posts", postsRouter)

//utilizzo il messaggio di errore del middleware
app.use(notFound);

//utilizzo il messaggio di errore del middleware
app.use(errorsHandler);

//attivo porta di ascolto del server
app.listen(port, () => {
    console.log("prova")
})