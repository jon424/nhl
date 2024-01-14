export const convertToEasternAndPacific = (utcTime) => {
    const utcDate = new Date(utcTime);

    // Convert to Eastern Time (ET)
    const easternTime = utcDate.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    // Convert to Pacific Time (PT)
    const pacificTime = utcDate.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    return {
        easternTime,
        pacificTime
    };
};

// Example usage:
const utcTime = '2024-01-13T18:00:00Z';
const { easternTime, pacificTime } = convertToEasternAndPacific(utcTime);

console.log(`UTC Time: ${utcTime}`);
console.log(`Eastern Time: ${easternTime}`);
console.log(`Pacific Time: ${pacificTime}`);
