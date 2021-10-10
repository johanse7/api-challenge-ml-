import express from "express"
import cors from "cors"
import configEnv from "./src/config/configEnv"
import { productsRoute } from "./src/routes/productsRoute"

const PORT = configEnv.port

const app = express()
app.use(cors())
app.use(express.json())

productsRoute(app)

app.listen(PORT, () => {
  console.log(`The application is listening on http://localhost:${PORT}`)
})
