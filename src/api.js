// import axios from 'axios';
// import { getTodaysDate } from './util/dates';

// const API_URL = 'https://api-web.nhle.com/v1';
// const TEAM_DETAILS_URL = 'https://api.nhle.com';

// export const getTodaysGameDetails = async () => {
//     const today = getTodaysDate();
//     try {
//         const res = await axios.get(`${API_URL}/score/${today}`, { followRedirects: true });
//         console.log({ res });
//         // return res;
//         const gameDetails = res.data;
//         return { data: { games: [].concat(gameDetails) } };
//     } catch (err) {
//         console.error('Error fetching Game Details data: ', err);
//         throw err;
//     }
// };

// export const getGameDetails = async (dates) => {
//     try {
//         // Use Promise.all to make parallel requests for each date
//         const responses = await Promise.all(
//             dates.map(async (date) => {
//                 return axios.get(`${API_URL}/score/${date}`, { followRedirects: true });
//             })
//         );

//         // Extract the data from each response
//         const gameDetails = responses.map((response) => response.data);

//         // Return the compiled game details
//         return { data: { games: [].concat(...gameDetails) } };
//     } catch (err) {
//         console.error('Error fetching Game Details data: ', err);
//         throw err;
//     }
// };


// export const getTeamDetails = async () => {
//     try {
//         const res = await axios.get(`${TEAM_DETAILS_URL}/stats/rest/en/team`);
//         return res;
//     } catch (err) {
//         console.error('Error fetching Team Details data: ', err);
//         throw err;
//     }
// };

import axios from 'axios';
import { getTodaysDate } from './util/dates';

// const API_URL = '/api/v1'; // Change to the proxy path
const API_URL = process.env.REACT_APP_API_URL;
console.log({ API_URL });
const TEAM_DETAILS_URL = 'https://api.nhle.com';

export const getTodaysGameDetails = async () => {
    const today = getTodaysDate();
    try {
        const res = await axios.get(`${API_URL}/score/${today}`, { followRedirects: true });
        console.log({ res });
        const gameDetails = res.data;
        return { data: { games: [].concat(gameDetails) } };
    } catch (err) {
        console.error('Error fetching Game Details data: ', err);
        throw err;
    }
};

export const getGameDetails = async (dates) => {
    try {
        const responses = await Promise.all(
            dates.map(async (date) => {
                return axios.get(`${API_URL}/score/${date}`, { followRedirects: true });
            })
        );

        const gameDetails = responses.map((response) => response.data);

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
