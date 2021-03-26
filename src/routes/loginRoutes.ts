import {Router, Request, Response} from 'express';

// ! type of body in the type definition file is 'any' therefore custom interface is defined to over ride it
interface RequestWithBody extends Request {
  // !any property in the body should be of type'string' and has value 'string' or 'undefined'
  body: {[key: string]: string | undefined}
}

const router = Router();

router.get('/login', (req: RequestWithBody, res: Response) => {
  res.send(`
    <form method="Post">
    <div>
      <lebel>Email</lebel>
      <input type="email" name="email" />
    </div>
    <div>
      <lebel>Password</lebel>
      <input type="password" name="password" />
    </div>
  <button>Submit</button>
    </form>
  `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const {email, password} = req.body;

  // !added type guard
  if(email){
    res.send(email)
  } else {
    res.send('Email is invalid!')
  }
})


export {router};