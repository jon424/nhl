const axios = require('axios');
const API_URL = 'https://example.com/';
const dateRange = ['2022-01-01', '2022-01-02', '2022-01-03']; // Replace with your actual date range

async function fetchDataForDate(date) {
    const endpoint = `${API_URL}/${date}`;

    try {
        const response = await axios.get(endpoint);
        const data = response.data;

        // Process the data for the current date
        console.log(`Data for ${date}:`, data);
    } catch (error) {
        console.error(`Error fetching data for ${date}:`, error);
    }
}

// Make requests for each date in the date range
for (const date of dateRange) {
    fetchDataForDate(date);
}
