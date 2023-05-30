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

//routing for add student
app.get("/addStudent", (req, res) => {
   //fetching the data from the form
   const {name,phone,email,gender} = req.query;

   //sanitizing the data 
        let qry = "SELECT * FROM crud WHERE email = ? or phone = ?";
        mysql.query(qry, [email,phone], (err, results) => {
        if (err) 
            throw err;
        else{ 
                if (results.length > 0){
                     res.render("add", { checkmesg: true });
                }
                else{
                    //insert query to insert the data into the database
                    let qry2 = "INSERT INTO crud VALUES (?,?,?,?)";
                    mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                    if (results.affectedRows > 0){
                            res.render("add", { mesg: true });
                        }
                    });
                }
            }
    })
});

//routing for search student
app.get("/searchstudent", (req, res) => {
    //fetching the data from the form
    const {phone} = req.query;
    //select query to fetch the data from the database
    let qry = "SELECT * FROM crud WHERE phone = ?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) 
            throw err;
        else
            if (results.length > 0){
                res.render("search", { mesg1: true, mesg2: false });
            }
            else{
                res.render("search", { mesg1: false, mesg2: true });
            }
    });

});


//routing for update student
app.get("/updatesearch", (req, res) => {
    const {phone} = req.query;
    //select query to fetch the data from the database
    let qry = "SELECT * FROM crud WHERE phone = ?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) 
            throw err;
        else
            if (results.length > 0){
                res.render("update", { mesg1: true, mesg2: false, data:results });
            }
            else{
                res.render("update", { mesg1: false, mesg2: true });
            }
    });

});

//routing for update student
app.get("/updatestudent", (req, res) => {
    //fetching the data from the form
    const{phone}=req.query;
    const{username}  = req.query;
    const {gender} = req.query;
    let qry = "UPDATE crud SET name=?, gender=? WHERE phone=?";
    mysql.query(qry, [name,gender,phone], (err, results) => {
        if (err) 
            throw err;
        else
            if (results.affectedRows > 0){
                res.render("update", { umesg: true  });
            }
            else{
                res.render("update", { umesg: false });
            }
    });
});
//Create Server
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});