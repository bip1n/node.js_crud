const express = require("express");
const app = express();
const port = 3004;
const mysql = require('./connection').con;

// configuration of the app object
app.set("view engine", "hbs");
app.set("views", "./view");
app.use(express.static(__dirname + "/public"));

//routing
app.get("/", (req, res) => {
    res.render("index")
});

app.get("/add", (req, res) => {
    res.render("add")
});

app.get("/search", (req, res) => {
    res.render("search")
});

app.get("/update", (req, res) => {
    res.render("update")
});

app.get("/delete", (req, res) => {
    res.render("delete")
});

app.get("/view", (req, res) => {
    res.render("view")
});                                 

app.get("/addStudent", (req, res) => {
   //fetching the data from the form
   const {name,phone,email,gender} = req.query;

   //sanitizing the data
        let qry = "SELECT * FROM crud WHERE email = ? or phone = ?";
        mysql.query(qry, [email,phone], (err, results) => {
        if (err) throw err;
        else{
            //insert query
            let qry2 = "INSERT INTO crud VALUES (?,?,?,?)";
            mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                if (results.affectedRows > 0)
                    res.render("add", { mesg: true })
                else
                    res.render("add", { mesg: false })
            });
        }
    })
});

//Create Server
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});