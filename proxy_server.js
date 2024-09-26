const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: true, // dynamically set 'Access-Control-Allow-Origin' to the requesting origin
    credentials: true // allow credentials (cookies, authorization headers, etc.)
}));

app.get('/api/search', async (req, res) => {
    try {
        const { query, lat, lng } = req.query;
        const apiUrl = `https://local-business-data.p.rapidapi.com/search?query=${query}&lat=${lat}&lng=${lng}`;
        const response = await axios.get(apiUrl, {
            headers: {
                'X-RapidAPI-Key': '2de08d84d6mshe42000c4198117fp11fd31jsn1927a808992d',
                'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
