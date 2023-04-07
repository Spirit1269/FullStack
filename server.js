//Declare dependencies
const dotenv = require('dotenv')
const express = require('express');
const app = express();
const {Pool} = require("pg");

//Initialize dotenv
dotenv.config();

//Initialize Express
app.use(express.json());
const port = process.env.PORT || 3000;

//Initialize PG
const pool = new Pool({connectionString:process.env.DATABASE_URL})
pool.connect();

app.get('/', (req, res) => {
    res.send("Welcome to the Yarn DB")
})
app.get('/yarn', (req, res) => {
    pool
        .query('SELECT * FROM yarn_db')
        .then((result)=> {
            console.log(result)
            res.send(result.rows)
        })
    .catch((e) => console.error(e.stack))
})

app.post('/yarn', (req, res) => {
       pool.query('INSERT INTO yarn (name, size, fiber_type, brand) VALUES ($1, $2, $3, $4) RETURNING * ',[
           req.body.name, 
           req.body.size, 
           req.body.fiber_type,
           req.body.brand
        ])
         .then((RESULT) => {
            res.send(result.rows);
        })
    }); 

app.patch('/yarn/:yarnID', (req, res) => {
      let key = Object.keys(req.body)[0];
      let value = Object.values(req.body)[0];
      pool.query('UPDATE yarn SET ' + key + ' = $1 WHERE id = $2', [value, req.params.yarnID])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((e) => console.error(e.stack));
    });

app.listen(port, (error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log(`Listening on port: ${port}`)
    }
})