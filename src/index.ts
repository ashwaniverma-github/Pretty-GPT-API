import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {userRouter} from "./routes/user"
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors())
const port = 3001;

app.use('/api',userRouter)


app.listen(port, () => {
  console.log(`app running on port ${port}`)
})

