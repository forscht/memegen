const http = require('http')
const querystring = require('querystring')
const memegen = require('./memegen')

const onRequest = async (req, res) => {

    try {

        const {
            base, avatar, x, y, size,
        } = querystring.parse(req.url.split('/?')[1])
        if (!base || !avatar || !x || !y || !size) {

            res.status = 400
            res.end('Bad request')

            return

        }
        const startTime = Date.now()
        const meme = await memegen(base, avatar, parseInt(x, 10), parseInt(y, 10), parseInt(size, 10))
        console.log(`===== meme generated in ${Date.now() - startTime} =====`)

        res.setHeader('Content-Type', 'image/png')
        res.end(meme)

    } catch (err) {

        res.status = 500
        res.end('Internal server error')

    }

}

const httpPort = parseInt(process.env.HTTP_PORT, 10) || 8080
http
    .createServer(onRequest)
    .listen(httpPort, () => {

        console.log(`===== http server listening on ${httpPort} =====`)

    })
