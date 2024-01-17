// /functions/getGameDetails.js
const axios = require('axios');

exports.handler = async (event, context) => {
    const API_URL = 'https://api-web.nhle.com';
    try {
        const { dates } = JSON.parse(event.body);

        const responses = await Promise.all(
            dates.map(async (date) => {
                return axios.get(`${API_URL}/v1/score/${date}`, { followRedirects: true });
            })
        );

        const gameDetails = responses.map((response) => response.data);

        return {
            statusCode: 200,
            body: JSON.stringify({ data: { games: [].concat(...gameDetails) } }),
        };
    } catch (err) {
        console.error('Error fetching Game Details data: ', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
