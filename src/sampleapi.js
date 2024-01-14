import axios from 'axios';

const API_URL = 'https://api-web.nhle.com/v1';

export const getGameDetails = async (dates) => {
    try {
        // Use Promise.all to make parallel requests for each date
        const responses = await Promise.all(
            dates.map(async (date) => {
                return axios.get(`${API_URL}/score/${date}`, { followRedirects: true });
            })
        );

        // Extract the data from each response
        const gameDetails = responses.map((response) => response.data);

        // Return the compiled game details
        return { data: { games: [].concat(...gameDetails) } };
    } catch (err) {
        console.error('Error fetching Game Details data: ', err);
        throw err;
    }
};
