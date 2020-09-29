import mongoose from 'mongoose'
import Chalk from "chalk";
import config from "../config/index"

const db = config.databaseUrl[config.environment];
mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log(`${Chalk.green(`Connected to the db successfully........`)}`))
.catch(error => console.log(error.message))

mongoose.connection.on('connected', () => [
    console.log(`${Chalk.green(`Mongoose connected to db!`)}`)
])

mongoose.connection.on('error', (error) => {
    console.log(error.message)
})


mongoose.connection.on('disconnected', () => {
    console.log(`${Chalk.red(`Mongoose connection is disconnected from db!`)}`)
})

process.on('SIGINT', async() => {
    await mongoose.connection.close()
    process.exit(0)
})