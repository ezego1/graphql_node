import app from "./app"
import Chalk from "chalk"
import  config from "./config/index"



const PORT = config.port

app.listen(PORT, () => {
  console.log(`${Chalk.blue(`App is now listening on port: ${PORT}`)}`);
});

