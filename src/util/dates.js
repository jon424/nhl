// Removed import statements
// The 'formatDate' function and 'getTodaysDate' are defined within this module

const generateDateRanges = (seasonStartDate, seasonEndDate) => {
    const dateRangeFromYesterday = [];
    const dateRangeFromTomorrow = [];
    const startDate = new Date(seasonStartDate);
    const endDate = new Date(seasonEndDate);

    // Set the time component of startDate to the end of the day
    startDate.setHours(0, 0, 0, 0);

    // Add 1 day to startDate
    startDate.setDate(startDate.getDate() + 1);

    // Add 1 day to endDate
    endDate.setDate(endDate.getDate() + 1);

    const lastDate = formatDate(endDate);
    const firstDate = formatDate(startDate);
    console.log({ lastDate });
    console.log({ firstDate });

    // 1. Date range from yesterday to seasonStartDate, in descending order
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    for (let date = yesterday; date >= startDate; date.setDate(date.getDate() - 1)) {
        dateRangeFromYesterday.push(formatDate(date));
    }

    // 2. Date range from tomorrow to seasonEndDate, in ascending order
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (let date = tomorrow; date <= endDate; date.setDate(date.getDate() + 1)) {
        dateRangeFromTomorrow.push(formatDate(date));
    }

    return { dateRangeFromYesterday, dateRangeFromTomorrow };
};

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Removed export statements

// Added 'module.exports' to make the functions available for CommonJS
module.exports = {
    generateDateRanges,
    getTodaysDate: () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
};
