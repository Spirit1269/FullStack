//Declare dependencies
const doetenv = require('dotenv')
const express = require('express');
const app = express();
const {Pool} = require("pg");

//Initialize dotenv
doetenv.config();

//Initialize Express
app.use(express.json());
const port = process.env.PORT || 3000;

//Initialize PG
const pool = new Pool({DB_URL:process.env.DATABASE_URL})
pool.connect();

app.get('/', (req, res) => {
    res.json({"Welcome to the Yarn DB"})
})
app.get('/yarn', (req, res) => {
    pool
        .query('SELECT * FROM yarn_db')
        .then((result)=> {
            console.log(result)
            res.send(result.rows)
        })
    .cath((e) => console.error(e.stack))
})
app.post('/yarn', (req, res)=>{
    pool
        .query('SELECT * FROM yarn WHERE id = $1' , [req.params.yarnID])
        .then(res.send(result.rows))
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
app.patch('/yarn/:yarnID', (req, res)=> {
       let key = OBJECT.keys(req.body)[0]
        let value = OBJECT.values(req.body)[0]
        pool.query('UPDATE yarn SET $1 = $2 WHERE id = $3')
})

// Route handler for creating a yarn
app.post('/yarn', (req, res) => {
    const yarns = req.body;
    yarn.id = yarn.length + 1;
    yarn.push(yarns);
    res.status(200).json(yarns);
  });

app.listen(port, (error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log(`Listening on port: ${port}`)
    }
})