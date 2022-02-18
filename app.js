const express = require("express");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require('body-parser')
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:/contactDance');
};

const port = 80;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('contact',contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug'); // set template engine as pug
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{   
    const params = {};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{   
    const params = {};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{   
    var myData = new Contact (req.body)
    myData.save().then(()=>{
        res.status(200).render('contact.pug')
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    })
})


app.listen(port,()=>{
    console.log(`the app started successfully on port ${port} `);
})