export const generateDateRanges = (seasonStartDate, seasonEndDate) => {
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

// Function to check if a date is in the future
// export const isFutureDate = (dateString) => {
//     const currentDate = new Date();
//     const targetDate = new Date(dateString);

//     return targetDate > currentDate;
// };

// Function to check if a date is in the past
// export const isPastDate = (dateString) => {
//     const currentDate = new Date();
//     const targetDate = new Date(dateString);

//     return targetDate < currentDate;
// };

// Example usage:
// const futureDate = '2024-10-10';
// const pastDate = '2024-01-01';

// console.log(isFutureDate(futureDate)); // Should return true
// console.log(isFutureDate(pastDate));   // Should return false

// console.log(isPastDate(futureDate));    // Should return false
// console.log(isPastDate(pastDate));      // Should return true

