export const generateDateRange = (inputDate, daysBefore, daysAfter) => {
    const result = [];
    const currentDate = new Date(`${inputDate}T00:00:00Z`);

    // Generate dates before the input date
    for (let i = daysBefore - 1; i >= 1; i--) {
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() - i);
        result.push(formatDate(previousDate));
    }

    // Add the input date
    result.push(formatDate(currentDate));

    // Generate dates after the input date
    for (let i = 1; i <= daysAfter + 1; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
        result.push(formatDate(nextDate));
    }

    return result;
};



// Format a date as 'YYYY-MM-DD'
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Example usage:
const inputDate = '2022-01-15';
const daysBefore = 2;
const daysAfter = 2;

const dateRange = generateDateRange(inputDate, daysBefore, daysAfter);
// console.log(dateRange);
