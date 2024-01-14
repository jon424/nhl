import axios from 'axios';

const API_URL = 'https://api-web.nhle.com/v1';
const TEAM_DETAILS_URL = 'https://api.nhle.com';
// const differentDay = '2023-12-15';

// export const getGameDetails = async () => {
//     try {
//         const res = await axios.get(`${API_URL}/score/now`, { followRedirects: true });
//         // const res = await axios.get(`${API_URL}/score/2023-12-15`, { followRedirects: true });
//         // const res = await axios.get(`${API_URL}/score/${differentDay}`, { followRedirects: true });
//         return res;
//     } catch (err) {
//         console.error('Error fetching Game Details data: ', err);
//         throw err;
//     }
// };

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


export const getTeamDetails = async () => {
    try {
        const res = await axios.get(`${TEAM_DETAILS_URL}/stats/rest/en/team`);
        return res;
    } catch (err) {
        console.error('Error fetching Team Details data: ', err);
        throw err;
    }
};