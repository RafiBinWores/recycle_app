const mongoose = require('mongoose');
mongoose.connect(process.env.LOCAL_DB , {useNewUrlParser: true, useunifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('Connected')
});

//models
require('./Category');
require('./Product');
require('./Location');
