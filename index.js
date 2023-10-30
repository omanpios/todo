import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const secretUser = "omar";
const secretPass = "omar";
app.use(express.static("public"));

var password = "";
var taskTitle = "";
var taskDescription = "";
var taskList = [];
var taskDate = "";

function getPassword(req, res, next) {
  password = req.body.user + req.body.password;
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(getPassword);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/check", (req, res) => {
  if (password == secretUser + secretPass) {
    res.render("todo.ejs");
  } else {
    res.render("index.ejs");
  }
});

function getNewTask(req, res, next) {
  taskTitle = req.body.taskTitle;
  taskDescription = req.body.taskDescription;
  taskDate = new Date().toLocaleString();
  taskList.unshift({ taskTitle, taskDescription, taskDate });
  next();
}
app.use(getNewTask);

app.post("/submit", (req, res) => {
  res.render("todo.ejs", {
    taskList: taskList,
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port} - ${new Date().toLocaleString()}`);
});
