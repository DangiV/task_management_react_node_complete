import express from 'express'
import './Db/Connection.js'
import router from './Route/Route.js'
import cors from 'cors'

const app = express();
const port = 3020;
app.use(express.json())
app.use(cors());
app.use(router)

app.listen(port)
console.log(`server invoked at http://localhost:${port}`)