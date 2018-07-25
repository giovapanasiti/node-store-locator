const signale = require('signale')

const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, function() {
  signale.success('Express server listening on port ' + port)
})

