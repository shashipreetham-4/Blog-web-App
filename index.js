import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/allblogs", (req, res) => {
    res.render("BlogPage.ejs", { blogs: blogs });
});





app.listen(port, () => {
    console.log(`server running on the port ${port}`);
})


const blogs = [];