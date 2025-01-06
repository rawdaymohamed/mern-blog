// dbConnection.ts
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//details from the env
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

//db connection
export const db = mongoose.connect((`mongodb://${dbHost}:${dbPort}/${dbName}`))
    .then(res => {
        if (res) {
            console.log(`Database connection succeffully to ${dbName}`)
        }

    }).catch(err => {
        console.log(err)
    })

