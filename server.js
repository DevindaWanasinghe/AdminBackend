const express = require('express')
const app = express()
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});

//const port = 3000

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//checking my sql database connection,
db.connect( (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("MySql Connected...")
    }
})

//show in browser
app.get('/', (req, res) => {
    res.send('Dewinda wanasinghe!')
});

// app.listen(port, () => {
//    console.log(`Example app listening on port ${port}`)
// })

//get data in database (show in browser)
app.get('/users', (req, res) => {
      db.query("SELECT * FROM users",(err, result) => {
            if (err){
                console.log(err);

            }else{
                res.send(result);
            }
      });
  });

//data insert database
app.post("/create", (req, res) =>{
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;

  db.query(
    "INSERT INTO users (name, password, email, phone) VALUES (?,?,?,?)",
    [name, password, email, phone],
      (err, result) => {
          if (err) {
            console.log(err);
          }else{
            res.send("You have registered successfully!");
          }
      }
  );

});

//Running terminal
app.listen(3001, () => {
      console.log(`Example app listening on port 3001`);
  });