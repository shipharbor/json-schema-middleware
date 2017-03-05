# json-schema-middleware
[![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][6]][7] [![js-standard-style][8]][9]

Middleware to validate your json schemas.

## usage
One of the most common things for your code to consume in a node framework is
probably going to be JSON. The problem is that it doesn't always come back in
the nice format you might need. We gotchu tho: `json-schema-middleware` takes in
a JSON schema and validates the request body against it. Here is how you would
use it with [merry][m]:

```js
var jsonSchemaMiddleware = require('json-schema-middleware')
var merry = require('merry')

var mw = merry.middleware
var mySchema = `
  {
    "required": true,
    "type": "object",
    "properties": {
      "hello": {
        "required": true,
        "type": "string"
      }
    }
  }
`

var app = merry()
app.router([
  ['/foo', mw([jsonSchemaMiddleware(mySchema), myCoolEndpoint])]
])

function myCoolEndpoint (req, res, ctx, done) {
  console.log('hot code bod', ctx.body)
  done(null, 'success!')
}
```

## API

### middleware.schema(string)
Takes a JSON string to validate the response against. It will parse and validate
the `res` against the schema, and attach it to `ctx.body` as part of middleware. If an error occurs,
`json-schema-middleware` will return a [boom][b] type error. 


## related content
- [merry][m]

## LICENSE
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/json-schema-middleware.svg?style=flat-square
[3]: https://npmjs.org/package/json-schema-middleware
[4]: https://img.shields.io/travis/shipharbor/json-schema-middleware/master.svg?style=flat-square
[5]: https://travis-ci.org/shipharbor/json-schema-middleware
[6]: http://img.shields.io/npm/dm/json-schema-middleware.svg?style=flat-square
[7]: https://npmjs.org/package/json-schema-middleware
[8]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[9]: https://github.com/feross/standard
[m]: https://github.com/shipharbor/merry
[b]: https://github.com/hapijs/boom
