// import libraries

const cors = require("cors");
const express = require("express");
const mongoClient = require("mongodb").MongoClient;

// create connection string and app

const conString = "mongodb://127.0.0.1:27017";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create api end points

app.get("/admin", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("video-tutorial");
        database.collection("admin").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});
app.get("/users", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("video-tutorial");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});
app.get("/videos", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("video-tutorial");
        database.collection("videos").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});
app.get('/videos/:id',(req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject=>{
       
        var database = clientObject.db("video-tutorial");

        database.collection("videos").findOne({video_id:id}).then(document=>{
              res.send(document);
              res.end();
        });
    });
});
app.get("/categories", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("video-tutorial");
        database.collection("categories").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});
app.post("/register-user",(req,res)=>{
    var user={
        userid:req.body.userid,
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    }
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("video-tutorial");
        database.collection("users").insertOne(user).then(()=>{
            console.log("user registered");
            res.send();
        })
    });
});
app.post("/add-video",(req,res)=>{
    var video={
        video_id : parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes: parseInt(req.body.likes),
        dislikes: parseInt(req.body.dislikes),
        views: parseInt(req.body.views),
        category_id: parseInt(req.body.category_id)
    }
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("video-tutorial");
        database.collection("videos").insertOne(video).then(()=>{
            console.log("video added");
            res.send();
        })
    });
});

app.put("/edit-video/:id",(req,res)=>{
    var id=parseInt(req.params.id);
    var video={
        video_id : parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes: parseInt(req.body.likes),
        dislikes: parseInt(req.body.dislikes),
        views: parseInt(req.body.views),
        category_id: parseInt(req.body.category_id)
    }
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("video-tutorial");
        database.collection("videos").updateOne({video_id:id},{$set:video}).then(()=>{
            console.log("video eddited");
            res.send();
        });
    });
});
app.put("/like-video/:id", (req, res) => {
    const id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObj => {
        const database = clientObj.db("video-tutorial");
        database.collection("videos").updateOne(
            { video_id: id },
            { $inc: { likes: 1 } }  // increment likes by 1 ($inc is increment operator of mongodb)
        ).then(() => {
            res.send({ message: "Like updated" });
        });
    });
});
app.put("/dislike-video/:id", (req, res) => {
    const id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObj => {
        const database = clientObj.db("video-tutorial");
        database.collection("videos").updateOne(
            { video_id: id },
            { $inc: { dislikes: 1 } }
        ).then(() => {
            res.send({ message: "Dislike updated" });
        });
    });
});
 app.delete("/delete-video/:id",(req,res)=>{
    var id=parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("video-tutorial");
        database.collection("videos").deleteOne({video_id:id}).then(()=>{
            console.log("deleted video");
            res.send();
        });
    });
 });

app.listen(4040);
console.log(`server started https://127.0.0.1:4040`); // backend run= npm run api