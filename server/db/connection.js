const mongoose = require('mongoose');

const connectDb = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);

        if(connection.STATES.connecting){
            console.log("connecting to DB");
        }
        if(connection.STATES.connected){
            console.log("DB connected");
        }
        if(connection.STATES.disconnected){
            console.log("DB disconnected")
        }
    } catch(error){
        console.log("Error connecting to database", error);
    }
};

module.exports = {connectDb};