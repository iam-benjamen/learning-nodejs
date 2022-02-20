const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");


//create an express app instance
const app = express();

//Connecting to a database
const dbURI =
  "mongodb+srv://Benjamen:iamoluwatimileyin@learningnode.o29ek.mongodb.net/learnode?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewURlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Register view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

//urlencoded
app.use(express.urlencoded({ extended: true }));

//middleware for logging
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//About Page route
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//All blogs sorted in descending order
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog2",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//List all blogs

// Fish a single blog by ID
// app.get("/single-blog", (req, res) => {
//   Blog.findById("620ac88e6bac044e40854d9b")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// blog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
