



//Richiamo l'array di oggetti presente nel file posts
const posts = require("../data/posts");
const connection = require("../data/posts_db");

//Creo le diverse funzioni da far eseguire succesivamente al server
function index(req, res) {
    // res.json(posts)
    // if (req.params.tags) {
    //     res.json(posts.find((element) => element.tags = req.params.tags))
    // }

    const sql = "SELECT * FROM posts";

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    })
};

function show(req, res) {
    // if (req.params.id) {
    //     res.json(posts.find((element) => element.id = req.params.id))
    // }
    const id = parseInt(req.params.id)

    const sql = "SELECT * FROM posts WHERE id = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "Post not found" });
        res.json(results[0]);
    })
};


function store(req, res) {

    //Creo id dinamico a partire dall'ultimo presente nell'array posts
    const dinamicId = posts[posts.length - 1].id + 1;

    //Creo nuovo oggetto post che recupererà le informazioni dai dati ricevuti
    const newPost = {
        id: dinamicId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    //Aggiungo il nuovo post all'array posts
    posts.push(newPost);

    console.log(posts);

    //restituisco status corretto
    res.sendStatus(201);

    //restituisco nuovo post in formato json
    res.json(newPost);
};

function update(req, res) {

    //Creo id dinamico in base alla richiesta
    const id = parseInt(req.params.id);

    //rilevo il post attraverso l'id inserito nella richiesta
    const post = posts.find((post) => post.id === id);

    //Creo condizione: se non c'è alcun oggetto con l'id inserito,
    //restituisco messaggio di errore
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not found",
            message: "Post non trovato"
        })
    }

    //altrimenti modifico l'oggetto con i parametri inseriti
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(posts)

    //restituisco il post modificato
    res.json(post)

};

function modify(req, res) {
    res.send("Modifica parziale del post n." + req.params.id)
};


function destroy(req, res) {
    const id = parseInt(req.params.id)

    // filteredPost = posts;
    // if (id) {
    //     let postToDelete = posts.find((post) => post.id === id);
    //     let indexPostToDelete = posts.indexOf(postToDelete)
    //     filteredPost.splice((indexPostToDelete), 1)

    //     console.log(filteredPost)
    // }
    // res.sendStatus(204)


    const sql = "DELETE FROM posts WHERE id = ?";

    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({
            error: "Database query error"
        });
        res.sendStatus(204)
    })
};

//Esportazione
module.exports = { index, show, store, update, modify, destroy }


