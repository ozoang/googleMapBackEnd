import express from "express";
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_location'
})

app.get('/getLatLng', async (req, res) => {
    const storeId = req.query.storeId;
    try {
        conn.query(
            'SELECT lat , lng FROM location_store WHERE store_id = ?',
            [storeId],
            (err: any, results: any, fields: any) => {
                if (err) {
                    console.log('Error query')
                    return res.json({ error: 'Error' });
                }
                if (results.length == 0) {
                    return res.json({ error: 'store ID not found' })
                }
                return res.json({ result: results[0] });
            }
        )
    } catch (error) {
        return res.json({ error: 'Error :'+error });
    }
})










conn.connect((err: any) => {
    err ? console.log('Error connect database : ', err) : console.log('connected')
})

app.listen(port, () => {
    console.log('start server on port ', port)
});