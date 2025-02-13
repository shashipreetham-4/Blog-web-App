import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/allblogs", (req, res) => {
    const truncatedBlogs = blogs.map(blog => {
    const words = blog.content.split(" ");
    return {
      ...blog,
      truncatedContent: words.length > 40 ? words.slice(0, 40).join(" ") + "..." : blog.content
    };
  });

  res.render("BlogPage.ejs", { blogs: truncatedBlogs });
});

app.get("/writeblog", (req, res) => {
    res.render("createBlog.ejs");
});

app.post("/updatedallblogs", (req, res) => {
    const newBlog = {
        title: req.body.title,
        Author: req.body.author,
        content: req.body.content
    };

    blogs.push(newBlog); // Adding the new blog to the blogs array

    const truncatedBlogs = blogs.map(blog => {
        const words = blog.content.split(" ");
        return {
            ...blog,
            truncatedContent: words.length > 40 ? words.slice(0, 40).join(" ") + "..." : blog.content
        };
    });

    res.render("BlogPage.ejs", { blogs: truncatedBlogs });
});

app.get("/viewblog", (req, res) => {
    const index = req.query.index;
    console.log(req.query);
    if (index >= 0 && index < blogs.length) {
        const blog = blogs[index];
        res.render("viewBlog.ejs", { blog });
    } else {
        res.status(404).send("Blog not found");
    }
});


app.get("/editblog", (req, res) => {
    const editindex = req.query.index;
    if (editindex >= 0 && editindex < blogs.length) {
        const blogedit = blogs[editindex];
        res.render("createBlog.ejs", { blogedit: blogedit, index:editindex });
    }
    else {
        res.status(404).send("Blog not found");
    }
});

app.post("/editedblog", (req, res) => {
    const editIndex = parseInt(req.body.index, 10); 
    console.log("Edit Index:", editIndex); 
  if (editIndex >= 0 && editIndex < blogs.length) {
    blogs[editIndex].title = req.body.title;
    blogs[editIndex].Author = req.body.author;
    blogs[editIndex].content = req.body.content;

    const truncatedBlogs = blogs.map(blog => {
      const words = blog.content.split(" ");
      return {
        ...blog,
        truncatedContent: words.length > 40 ? words.slice(0, 40).join(" ") + "..." : blog.content
      };
    });

    res.render("BlogPage.ejs", { blogs: truncatedBlogs });
  } else {
    res.status(400).send("Invalid blog index");
  }
});

app.post("/deleteblog", (req, res) => {
    const index = parseInt(req.query.index, 10); 
    if (index >= 0 && index < blogs.length) {
        blogs.splice(index, 1); 
        
        const truncatedBlogs = blogs.map(blog => {
            const words = blog.content.split(" ");
            return {
                ...blog,
                truncatedContent: words.length > 40 ? words.slice(0, 40).join(" ") + "..." : blog.content
            };
        });

        res.render("BlogPage.ejs", { blogs: truncatedBlogs });
    } else {
        res.status(400).send("Invalid index");
    }
});



app.post("/newblog", (req, res) => {
    const tempblog = {
        title: req.body["title"],
        Author: req.body["Author"],
        content: req.body["content"]
    }
    blogs.push(tempblog);
    res.render("BlogPage.ejs");
});




app.listen(port, () => {
    console.log(`server running on the port ${port}`);
})


const blogs = [];

blogs.push({
  title: "The Art of Living in a New City",
  Author: "Marta González",
  content:
    "Living in a new city can be both exciting and challenging. When I arrived in Barcelona, I was full of enthusiasm, but also a little scared. I didn't know anyone, and every street seemed like a maze waiting to be explored.\n\nAt first, everything was unfamiliar. I had to learn to navigate the city, find places to shop, and discover enjoyable spots to spend time. But as each day passed, I felt more comfortable and confident. I learned to appreciate the small details, like having coffee in a square or listening to street musicians.\n\nOne of the biggest challenges was making friends. However, Barcelona is a vibrant and welcoming city, filled with open and friendly people. I started joining groups with common interests, like cooking classes and city tours, and soon made friends who made me feel at home.\n\nThe key to adapting to a new city is patience and being open to new experiences. Over time, I stopped feeling like a stranger and began to appreciate the cultural richness and diversity that Barcelona offers. Today, after a year, I feel like part of the city and can't imagine living anywhere else.\n\nIf you're thinking about moving to a new city, my advice is to embrace the change and allow yourself to enjoy the adventure. Each day is an opportunity to learn and grow, and over time, that unknown city will become your home.",
});

blogs.push({
  title: "The Power of Discipline",
  Author: "Carlos Ruiz",
  content:
    "Since I was a kid, I always had big dreams and aspirations, but I found it difficult to maintain the discipline to achieve them. I saw successful people and wondered what their secret was. That's when I decided to make a change in my life and work on my self-discipline.\n\nAt first, setting consistent routines and habits was challenging. I aimed to get up early every morning to exercise and devote time to my personal projects. The key to keeping pace was to set clear and achievable goals and celebrate the small victories along the way.\n\nOver time, I started noticing significant changes. My productivity increased, and I felt more motivated to tackle daily challenges. I discovered that discipline is not just about doing things because you have to, but because you want to achieve something greater. This led me to get a promotion at work and accomplish personal goals that once seemed out of reach.\n\nDiscipline also taught me to be more aware of my decisions. Every action has an impact, and the more consistent we are, the closer we get to our goals. For example, by adopting healthy habits, I not only improved my physical health but also my emotional well-being.\n\nToday, I can say that discipline is one of the fundamental pillars for achieving success. No matter what you want to achieve, it is always possible with dedication and consistency. If you're struggling with discipline, my advice is to start small and surround yourself with people who inspire you to keep going. There's no better time than now to start your journey toward success.",
});