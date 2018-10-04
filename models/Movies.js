const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    category : String,
    country : String,
    imbd_score : Number,
    createdAt :{
        type:Date,
        default : Date.now 
    }
})

module.exports = mongoose.model('movie',movieSchema)