import express, {Request, Response} from 'express'
import {router } from './routes/loginRoutes'


const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Hi there!!</h1>
    </div>
  `)
})

// !middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(router)

app.listen(3000, () => {
  console.log('Listening on port 3000');
})