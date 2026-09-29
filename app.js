const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

// --------------------
// Express Configuration
// --------------------

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


// --------------------
// MongoDB Configuration
// --------------------

const mongoURL = "mongodb://127.0.0.1:27017";

const client = new MongoClient(mongoURL);

let postsCollection;


// --------------------
// Connect to MongoDB
// --------------------

async function connectDB() {
    await client.connect();

    const database = client.db("cms_lab");

    postsCollection = database.collection("posts");

    console.log("Connected to MongoDB");
}


// --------------------
// HOME PAGE
// Display all posts
// --------------------

app.get("/", async (req, res) => {

    const posts = await postsCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();

    res.render("posts", { posts });
});


// --------------------
// CREATE POST PAGE
// Display create-post form
// --------------------

app.get("/posts/new", (req, res) => {

    res.render("new-post");

});


// --------------------
// CREATE POST
// Insert new post into MongoDB
// --------------------

app.post("/posts", async (req, res) => {

    const { title, content, author } = req.body;


    // Validate required fields

    if (!title || !content || !author) {

        return res.send(
            "Title, content and author are required."
        );

    }


    // Insert post into MongoDB

    await postsCollection.insertOne({

        title: title,

        content: content,

        author: author,

        createdAt: new Date()

    });


    // Redirect to home page

    res.redirect("/");

});


// --------------------
// VIEW INDIVIDUAL POST
// Retrieve post using MongoDB _id
// --------------------

app.get("/posts/:id", async (req, res) => {

    const post = await postsCollection.findOne({

        _id: new ObjectId(req.params.id)

    });


    if (!post) {

        return res.send("Post not found.");

    }


    res.render("post", { post });

});


// --------------------
// EDIT POST PAGE
// Display existing post in edit form
// --------------------

app.get("/posts/:id/edit", async (req, res) => {

    const post = await postsCollection.findOne({

        _id: new ObjectId(req.params.id)

    });


    if (!post) {

        return res.send("Post not found.");

    }


    res.render("edit-post", { post });

});


// --------------------
// UPDATE POST
// Update existing post in MongoDB
// --------------------

app.post("/posts/:id/edit", async (req, res) => {

    const { title, content, author } = req.body;


    // Validate required fields

    if (!title || !content || !author) {

        return res.send(
            "Title, content and author are required."
        );

    }


    // Update the post

    await postsCollection.updateOne(

        {
            _id: new ObjectId(req.params.id)
        },

        {
            $set: {

                title: title,

                content: content,

                author: author

            }
        }

    );


    // Redirect to the updated post

    res.redirect("/posts/" + req.params.id);

});


// --------------------
// START SERVER
// Connect MongoDB first
// --------------------

async function startServer() {

    await connectDB();


    app.listen(3000, () => {

        console.log(
            "Server running on http://localhost:3000"
        );

    });

}


startServer();

