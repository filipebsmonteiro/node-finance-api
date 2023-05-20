import express from 'express'
import { Router, Request, Response } from 'express'
import { quote } from 'yahoo-finance'
// import type { VercelRequest, VercelResponse } from '@vercel/node';
import { VercelRequest, VercelResponse } from '@vercel/node';
// import { historical } from 'google-finance'

const app = express()
const route = Router()
// const port = process.env.PORT || 4000

app.use(route)
// app.listen(port, () => console.log('Server running in ' + port))

const allowCors = fn => async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

route.get('/quotes', async (request: Request, response: Response) => {
    // const data = await historical({ symbols: ['NASDAQ:AAPL'], from: `2023-05-15`, to: `2023-05-19` });
    const from = request.query.from || new Date(),
    to = request.query.to || new Date(),
    symbols = request.query.symbols ? `${request.query.symbols}`.split(`|`) : undefined,
    symbol = request.query.symbol;

    const data = await quote({ symbols, symbol, from, to });
    response.status(200).json(data);
});

route.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Sucesso!",
    })
});

export default allowCors(app);