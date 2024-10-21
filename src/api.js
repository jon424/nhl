import axios from 'axios';
import { getTodaysDate } from './util/dates';

const API_URL = '/api/v1'; // Change to the proxy path
const TEAM_DETAILS_URL = 'https://api.nhle.com';

/**
 * Fetch data from a given URL and handle errors.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - The response data.
 */
const fetchData = async (url) => {
    try {
        const response = await axios.get(url, { followRedirects: true });
        return response.data;
    } catch (err) {
        console.error(`Error fetching data from ${url}: `, err);
        throw err;
    }
};

/**
 * Get today's game details.
 * @returns {Promise<{ data: { games: any[] } }>}
 */
export const getTodaysGameDetails = async () => {
    const today = getTodaysDate();
    const gameDetails = await fetchData(`${API_URL}/score/${today}`);
    return { data: { games: [gameDetails] } }; // Directly returning an array
};

/**
 * Get game details for multiple dates.
 * @param {string[]} dates - Array of dates to fetch game details for.
 * @returns {Promise<{ data: { games: any[] } }>}
 */
export const getGameDetails = async (dates) => {
    console.log({ dates });
    const responses = await Promise.all(dates.map(date => fetchData(`${API_URL}/score/${date}`)));
    return { data: { games: [...responses] } }; // Use spread to merge responses directly
};

/**
 * Get team details.
 * @returns {Promise<any>}
 */
export const getTeamDetails = async () => {
    return fetchData(`${TEAM_DETAILS_URL}/stats/rest/en/team`);
};
