import axios from 'axios';

const API_URL = 'https://api-web.nhle.com/v1';
const TEAM_DETAILS_URL = 'https://api.nhle.com';

export const getGameDetails = async () => {
    try {
        const res = await axios.get(`${API_URL}/score/now`, { followRedirects: true });
        return res;
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