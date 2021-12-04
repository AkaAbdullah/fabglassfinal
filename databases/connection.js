import mongoose from 'mongoose';

const connection = {};

async function dbconnect() {
    if (connection.isConnected) {
        return;
    }
    const db = await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    connection.isConnected = db.connections[0].readyState;
    console.log(`Mongoose connected to ${process.env.DB_URL}`);
}
export default dbconnect;