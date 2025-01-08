import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//details from the env
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const connectionURL = process.env.CONNECTION_URL;

// Ensure connectionURL is a string
if (!connectionURL) {
    throw new Error("CONNECTION_URL is not defined in the environment variables.");
}

//db connection
export const db = mongoose.connect((connectionURL))
    .then(res => {
        if (res) {
            console.log(`Database connection succeffully to ${dbName}`)
        }

    }).catch(err => {
        console.log(err)
    })

