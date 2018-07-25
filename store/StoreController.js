const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const signale = require('signale')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const Store = require('./Store')
const VerifyToken = require('../auth/VerifyToken')

router.post('/', VerifyToken, function (req, res) {

  signale.debug(req.body)


  var store = new Store({
    name: req.body.name,
    address: req.body.address,
    point: {
      type: 'Point',
      coordinates: [Number(req.body.lng), Number(req.body.lat)]
    }
  })

  store.save(function (error, store) {
    if (error) {
      return res.status(500).send('{error:' + error + ' }')
    }

    return res.send({
      store: store
    })
  })
})


router.get('/nearby', VerifyToken, function (req, res) {

  const lat = parseFloat(req.query.lat)
  const lng = parseFloat(req.query.lng)
  const dist = parseInt(req.query.distance)

  if (lat && lng && dist) {
    Store.find({
      point: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: dist,
          $minDistance: 0
        }
      }
    }).exec(function (err, stores) {
      if (err) {
        return res.send({
          error: err
        })
      } else {
        return res.send({
          records: stores.length,
          stores: stores
        })
      }
    })
  } else {
    return res.send({
      error: 'I parametri sono obbligatori'
    })
  }

})

router.stack.forEach(function(r){
  if (r.route && r.route.path){
    signale.debug('Path --> /api/stores' + r.route.path + ' | Method --> ' + r.route.stack[0].method)
  }
})

module.exports = router