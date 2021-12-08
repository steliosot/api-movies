const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

// Create a new database (Movies)
module.exports = mongoose.model('Movies',MovieSchema);
