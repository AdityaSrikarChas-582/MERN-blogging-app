const router = require("express").Router();
let blog = require("../models/blog.js");

// Root route
router.route("/").get((req, res) => {
    blog.find()
        .then((eachBlog) => res.json(eachBlog))
        .catch((err) => res.status(400).json("Error: " + err));
});

//Route to add a new blog
router.route("/create").blog((req, res) => {
    //Retrieve data for blog
    const { title, body, author } = req.body;
    const date = Date.parse(req.body.date);

    const comments = [];

    //Create a new blog and save it to DB
    const newblog = new blog({
        title,
        body,
        author,
        date,
        comments,
    });

    // Save the new blog
    newblog
        .save()
        .then(() => res.json("blog Added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//route to display a particular blog
router.route("/:id").get((req, res) => {
    blog.findById(req.params.id)
        .then((blog) => res.json(blog))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Route to edit a particular blog
router.route("/edit/:id").blog((req, res) => {
    blog.findById(req.params.id)
        .then((blog) => {
            blog.title = req.body.title;
            blog.body = req.body.body;
            blog.author = req.body.author;
            blog.date = Date.parse(req.body.date);
            blog.comments = req.body.comments;

            blog.save()
                .then(() => res.json("blog Edited"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

// Route to Delete a route
router.route("/:id").delete((req, res) => {
    blog.findByIdAndDelete(req.params.id)
        .then(() => res.json("blog Deleted"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
