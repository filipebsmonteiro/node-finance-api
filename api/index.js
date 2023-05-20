import express from 'express'
import { Router } from 'express'
import { quote } from 'yahoo-finance'
// import { historical } from 'google-finance'

// const express = request('express');
// const { Router } = request('express');
// const { quote } = request('yahoo-finance');

const app = express()
const route = Router()
const port = process.env.PORT || 4000

app.use(route)
app.listen(port, () => console.log('Server running in ' + port))

route.get('/', async (req, res) => {
    // const data = await historical({ symbols: ['NASDAQ:AAPL'], from: `2023-05-15`, to: `2023-05-19` });
    const data = await quote({ symbols: ['PETR4.SA'], from: `2023-05-15`, to: `2023-05-19` });
    return res.json({
        success: true,
        message: "Sucesso!",
        data
    })
})

// Export the Express API
export default app;
// module.exports = app;