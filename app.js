const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


// import routes
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');


// app
const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());



// route
app.use('/api', userRoutes);
app.use('/api', productRoutes);

app.use('/', (req, res) => res.json({ msg: "Hello World" }));


// db 
mongoose.connect(process.env.MONGO_LOCAL_URL, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('database connected');
        // listener
        app.listen(process.env.PORT, () => {
            console.log(`server is running... http://localhost:${process.env.PORT}`);
        });
    });
