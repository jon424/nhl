const axios = require('axios');
const { getTodaysDate } = require('../src/util/dates');
// getTodaysGameDetails.js

exports.handler = async (event, context) => {
    // const API_URL = '/.netlify/functions/getTodaysGameDetails';
    const API_URL = 'https://api-web.nhle.com';

    // Add headers to allow cross-origin requests
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
        // Handle preflight requests
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Preflight request successful' }),
        };
    }

    const today = getTodaysDate();

    try {
        const res = await axios.get(`${API_URL}/v1/score/${today}`, { followRedirects: true });
        const gameDetails = res.data;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ data: { games: [].concat(gameDetails) } }),
        };
    } catch (err) {
        console.error('Error fetching Game Details data: ', err);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};


// import axios from 'axios';
// import { getTodaysDate } from './util/dates';

// const API_URL = '/api';

// export const getTodaysGameDetails = async () => {
//     console.log('netlify functions');
//     const today = getTodaysDate();
//     try {
//         const res = await axios.get(`${API_URL}/v1/score/${today}`, { followRedirects: true });
//         console.log({ res });
//         const gameDetails = res.data;
//         return { data: { games: [].concat(gameDetails) } };
//     } catch (err) {
//         console.error('Error fetching Game Details data: ', err);
//         throw err;
//     }
// };