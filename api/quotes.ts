// import express from 'express'
// import { Router } from 'express'
import { quote } from 'yahoo-finance'
import type { VercelRequest, VercelResponse } from '@vercel/node';
// import { historical } from 'google-finance'

// const app = express()
// const route = Router()
// const port = process.env.PORT || 4000

// app.use(route)
// app.listen(port, () => console.log('Server running in ' + port))

// route.get('/', async (req, res) => {
//     const data = await historical({ symbols: ['NASDAQ:AAPL'], from: `2023-05-15`, to: `2023-05-19` });
//     return res.json({
//         success: true,
//         message: "Sucesso!",
//         data
//     })
// })

// Export the Express API
export default async function handler(request: VercelRequest, response: VercelResponse ) {
    const from = request.query.from || new Date(),
    to = request.query.to || new Date(),
    symbols = request.query.symbols ? `${request.query.symbols}`.split(`|`) : undefined,
    symbol = request.query.symbol;

    const data = await quote({ symbols, symbol, from, to });
    response.status(200).json(data);
}