const jsonServer = require('json-server');
const low = require('lowdb');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db', 'db.json'));
const FileSync = require('lowdb/adapters/FileSync')
const middlewares = jsonServer.defaults();

const adapter = new FileSync(path.join(__dirname, 'db', 'db.json'));
const db = low(adapter)

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))

// Add custom routes before JSON Server router
server.get('/calendar/:date', (req, res) => {
  console.log('req.params', req.params);
  console.log('data', router.db.get('tasks'));
  console.log('db', db.get('tasks'));
  // res.jsonp(req.query)
  const data = {};
  res.send(data)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
