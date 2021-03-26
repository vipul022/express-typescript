import {Router, Request, Response, NextFunction} from 'express';

// ! type of body in the type definition file is 'any' therefore custom interface is defined to over ride it
interface RequestWithBody extends Request {
  // !any property in the body should be of type'string' and has value 'string' or 'undefined'
  body: {[key: string]: string | undefined}
}


const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn){
    next();
    return;
  }else {
    res.status(403);
    res.send('Not Permitted')
  }
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
  if(email && password && email ==='v@v.com' && password === 'password'){
    // !mark the person as loggedin
    req.session = {loggedIn: true}
    res.redirect('/')
  
  } else {
    res.send('Email is invalid!')
  }
})

router.get('/', (req: Request, res: Response) => {
  if(req.session && req.session.loggedIn){
    // console.log("req.session,loggenIn=>", req.session.loggedIn)
    res.send(`
      <div>
      <div>
        <h1>You are logged in</h1>
      </div>
      <a href ='/logout'> Logout</a>
      </div>
    `)
  }else {
  
    res.send(`
    <div>
    <div>
      <h1>You are not logged in</h1>
    </div>
    <a href ='/login'> Login</a>
    </div>
  `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  console.log("req.session=>", req.session)
  req.session = undefined;
  res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`Welcome to protected zone!`)
})

export {router};