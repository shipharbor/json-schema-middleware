var isMyJsonValid = require('is-my-json-valid')
var fastJsonParse = require('fast-json-parse')
var explain = require('explain-error')
var concat = require('concat-stream')
var assert = require('assert')
var boom = require('boom')

module.exports = schemaMiddleware

function schemaMiddleware (schema) {
  assert.ok(typeof schema === 'string' || typeof schema === 'object', 'json-schema-middleware: schema should be type string or type object')
  var validate = isMyJsonValid(schema)

  return function (req, res, ctx, done) {
    _parseJson(req, function (err, json) {
      if (err) {
        var parseErr = boom.wrap(err, 400)
        return done(parseErr)
      }
      validate(json)
      if (validate.errors) {
        res.statusCode = 400
        var validationErr = boom.create(400, 'error validating JSON', validate.errors)
        return done(validationErr)
      }
      ctx.body = json
      done()
    })
  }
}

function _parseJson (req, cb) {
  req.pipe(concat(handler), function (err) {
    if (err) return cb(explain(err, 'pipe error'))
  })

  function handler (buf) {
    var json = fastJsonParse(buf)
    if (json.err) {
      return cb(explain(json.err, 'json-shema-middleware: error parsing JSON'))
    }
    cb(null, json.value)
  }
}
