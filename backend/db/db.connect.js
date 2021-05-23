const mongoose = require('mongoose');

async function initializeDBConnection(){
    // Connecting to DB
    const uri = "mongodb+srv://KnackOfAbhinav:Abhinav2506@universe.stqwv.mongodb.net/ecommerce?retryWrites=true&w=majority";
    try{
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(() => console.log("successfully connected"))
    } catch (err){
        console.log("error connecting to db", err)
    }
}

module.exports = { initializeDBConnection }