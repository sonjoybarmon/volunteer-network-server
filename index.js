require('dotenv').config();
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectID;

const uri = 'mongodb+srv://network:network321@cluster0.5trbi.mongodb.net/volunteerNetwork?retryWrites=true&w=majority';

const app = express()
    app.use(cors())
    app.use(bodyParser.json())   
const port = process.env.PORT || 8080

const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
client.connect(err => {
  const networkInfo = client.db("volunteerNetwork").collection("information");
  
  const collection = client.db("volunteerNetwork").collection("error");
 
  app.get('/addEvent' ,(req, res) =>{
    networkInfo.find({})
    .toArray((err , documents) =>{
        res.send(documents)
    })
  })


  app.get('/register', (req, res) => {
    networkInfo.find()
      .toArray((err , document)=>{
          res.send(document)
      })
  })

  app.get('/register/:key' , (req, res) =>{
    const regId = parseInt(req.params.key) 
    networkInfo.find({ key : regId})
    .toArray((err , documents) =>{
      res.send(documents)
    })
  })

  app.post('/addVolunteer' , (req , res) =>{
    const volunteer = req.body;
    collection.insertOne(volunteer)
    .then(result => {
      res.send(result.insertedCount > 0)
    })

  })

  app.get('/user' , (req ,res) => {
    
    collection.find({email : req.query.email})
    .toArray((err , documents) => {
      res.send(documents)
    })
  })

  app.delete('/delete/:id' ,(req, res) => {
    collection.deleteOne({ _id : ObjectId(req.params.id)})
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })



});







app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})