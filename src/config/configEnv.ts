import * as dotenv from "dotenv"

dotenv.config()

const configEnv = {
  port: process.env.PORT || 3000,
  urlBaseApiMl: process.env.URL_BASE_API_ML,
  authorName: process.env.AUTHOR_NAME,
  authorLastName: process.env.AUTHOR_LASTNAME,
}

export default configEnv
