const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path')

const apiRouter = require('./Routers/router')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(bodyParser.json());

app.use('/api', apiRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'))
    })
}


mongoose.connect(
    // 'mongodb://127.0.0.1:27017/bhavik', 
    'mongodb+srv://Bhavik:bhavik100001@cluster0.dftat.mongodb.net/zomato_clone?retryWrites=true&w=majority', 
    {useUnifiedTopology: true, useNewUrlParser: true}
).then(
    success => {
        console.log(`connected to the database`)
        app.listen(port, () => {
            console.log(`server running at port ${port}`);
        })
    }
).catch(
    error => {
        console.log(`failed to connect to the database`)
        console.log(error)
    }
)