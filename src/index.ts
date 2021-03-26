import express, {Request, Response} from 'express'
import {router } from './routes/loginRoutes'
import cookeiSession from 'cookie-session';


const app = express();

// app.get('/', (req: Request, res: Response) => {
//   res.send(`
//     <div>
//       <h1>Hi there!!</h1>
//     </div>
//   `)
// })

// !middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// !cookie session attach the 'session' property to req
app.use(cookeiSession({keys:['ibunoi']}))

app.use(router)

app.listen(3000, () => {
  console.log('Listening on port 3000');
})