const fs           = require('fs'),
      path         = require('path'),
      express      = require('express'),
      app          = express(),
      config       = require('./config'),
      uuidV1       = require('uuid/v1'),
      cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      server       = require('http').createServer(app),
      io           = require('socket.io')(server);


let clientList = [];

const PORT = config.PORT;
const publicURL = path.resolve(`${__dirname}/public`);

app.use(express.static(publicURL));

const Datastore = require('nedb');
const db = new Datastore({filename: 'members', autoload: true, onload: (err)=>{if (err) throw err}});
const session = require('express-session');
const nedbstore = require('nedb-session-store')(session);

const todo_db = new Datastore({filename: 'todos', autoload: true});

app.use(express.json());

app.use(cookieParser());

app.use(
  session(
    {
      secret: 'secret',
      cookie: {
        maxAge: 365 * 24 * 60 * 1000
      },
      store: new nedbstore({
        filename: 'sessions'
      }),
      resave: true,
      saveUninitialized: true
    }
  )
);

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser)

app.get("/", (req, res)=>{
  if(!req.session.username){
    res.render(path.resolve(__dirname + "/views/login.ejs"));
  } else {
    res.render(path.resolve(__dirname + "/views/index.ejs"), req);
  }
});

app.get('/signup', (req, res)=>{
    res.render(path.resolve(__dirname + "/views/signup.ejs")) 
});

app.get("/members", (req, res)=>{
  if(!req.session.username){
    res.render(path.resolve(__dirname + "/views/login.ejs"));
  } else {
    res.render(path.resolve(__dirname + "/views/members.ejs"), req);
  }
});

app.get("/tasks", (req, res)=>{
  if(!req.session.username){
    res.render(path.resolve(__dirname + "/views/login.ejs"));
  } else {
    res.render(path.resolve(__dirname + "/views/tasks.ejs"), req);
  }
});

app.get('/chat', function(req, res) {
  if(!req.session.username){
    res.render(path.resolve(__dirname + "/views/login.ejs"));
  } else {
  res.render(path.resolve(__dirname + "/views/chat.ejs"), req)
  }
});

app.get('/profile', function(req, res) {
  if(!req.session.username){
    res.render(path.resolve(__dirname + "/views/login.ejs"));
  } else {
    res.render(path.resolve(__dirname + "/views/profile.ejs"), req)
  }
});

app.get('/logout', (req, res) =>{
  delete req.session.username;
  res.redirect('/');
})

app.post('/login', (req, res)=>{
  let found = false;
  db.find({"username": req.body.username, "password": req.body.password}, (err, docs)=>{
    if (docs.length == 0){
      console.log(`${req.body.username} login failed.`)
      res.send("No no no. No auth. <a href='/'>Try Again</a>")
    }  else {
      let userRecord = docs[0]
      console.log(`${req.body.username} login succeeded.`)
      req.session.username = userRecord.username;
      req.session.name = userRecord.name;
      req.session.lastlogin = Date.now();
      res.render(__dirname + '/views/index.ejs', req)
    }
  })
})

server.listen(PORT, ()=>{
  console.log(`Listening on ${PORT}`)
})

app.get("/api/v1/members", async (req, res) => {
  try {

    db.find({}, (err, docs)=>{
      if (err) throw err;
      res.json(docs)
    })
  } catch(error) {
    console.error(error);
    res.json(error);
  }
});

app.post("/api/v1/members", async (req, res) => {
  try {
    const member = {
      username: req.body.username,
      name: req.body.name,
      id: req.body.id,
      password: req.body.password
    }

    let isNewUser = false;
    db.find({ "username":member.username }, (err, docs)=>{
      if(docs.length===0){
        isNewUser = true;
        let goodPassword = checkPassword(member.password);
        console.log(isNewUser, goodPassword)
        if(isNewUser && goodPassword){
          db.insert(member, (err, doc)=>{
            if (err) throw err;
            console.log(doc)
          })
        res.json(member);

        }
      } else {
      console.log("User exists!")
      }
    })

  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

app.put("/api/v1/members/:id", async (req, res) => {
  try {
    const update = {
      username: req.body.username,
      name: req.body.name,
      id: req.body.id,
      password: req.body.password
    }

    db.update({_id: req.params.id}, update, {}, (err)=>{
      if (err) throw err;
      console.log(update)
    })
      res.json(update)
  } catch (error) {
    console.error(error);
    res.json(update);
  }
});

app.delete("/api/v1/members/:id", async (req,res) =>{
  try {
    const options = {
      multi: false
    };

    db.remove({_id: req.params.id}, options, (err, numRemoved)=>{
      if (err) throw err;
      console.log(numRemoved);
    })
    res.json({"Deleted":req.params.id})
  } catch(error){
    console.log(error);
    res.json(error);
  }
});

app.get("/api/v1/todos", async (req, res) => {
  try {
    todo_db.find({}, (err, docs)=>{
      if (err) throw err;
      res.json(docs)
    })
  } catch(error) {
    console.error(error);
    res.json(error);
  }
});

app.post("/api/v1/todos", async (req, res) => {
  try {
    const todo = {
      todo: req.body.todo,
      status: req.body.status,
      user: req.session.username,
      date: req.body.date
    };
    todo_db.insert(todo, (err, doc)=>{
      if (err) throw err;
      console.log(doc)
    })
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

app.put("/api/v1/todos/:id", async (req, res) => {
  try {
    const update = {
      todo: req.body.todo,
      status: req.body.status,
      user: req.body.user,
      date: req.body.date,
    }

    todo_db.update({_id: req.params.id}, update, {}, (err)=>{
      if (err) throw err;
      console.log(update)
    })
      res.json(update)
  } catch (error) {
    console.error(error);
    res.json(update);
  }
});

app.delete("/api/v1/todos/:id", async (req,res) =>{
  try {
    const options = {
      multi: false
    };

    todo_db.remove({_id: req.params.id}, options, (err, numRemoved)=>{
    if (err) throw err;
      console.log(numRemoved);
    })
    res.json({"Deleted":req.params.id})
  } catch(error){
    console.log(error);
    res.json(error);
  }
});

function checkPassword(password){
  if(password.length > 2 && password.length < 13){
    return true
  } else {
    console.log("bad pass")
    return false
  }
}

io.on('connection', (socket) => {
  console.log('Connection was made!')
  var address = socket.handshake.address;
  io.emit('server response', `${address}`)

  clientList.push(address);

  clientList = [...new Set(clientList)];
  io.emit('server response', `${clientList}`);

  console.log("We have a new client: " + socket.id);
  // When this user emits, client side: socket.emit('otherevent',some data);
  socket.on('chatmessage', function (data) {
 // Data comes in as whatever was sent, including objects
  console.log("Received: 'chatmessage' " + data);
  
// Send it to all of the clients
  socket.broadcast.emit('chatmessage', data);
  })

  socket.on('disconnect', () =>{
    clientList = [...new Set(clientList)];
    let index = clientList.indexOf(socket.handshake.address);
    console.log(clientList, index, "haha");
    if(index > -1){
      clientList.splice(index, 1);
      io.emit('server response', `${clientList}`);
      
    }
    console.log(`${socket.id} disconnected.`)
  });
});
