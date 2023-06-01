const mysql = require('mysql');
const con= mysql.createConnection({ 
    
    host:'localhost',
    user:'root',
    password:'',
    database:'student_mis',
    port: 3306
});
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database successfully!");
});

module.exports.con = con;