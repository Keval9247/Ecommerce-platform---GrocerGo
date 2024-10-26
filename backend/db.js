const mongoose = require('mongoose')

const url = 'mongodb+srv://Keval:Keval%403Olix@cluster0.sx7tqks.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

const connectionMongodb = async () => {
    try {
        await mongoose.connect(url).then(() =>
            console.log('Connected to MongoDB...')
        )
    } catch (error) {
        console.log("error conneting db : ", error);
        throw error;
    }
}
module.exports = connectionMongodb