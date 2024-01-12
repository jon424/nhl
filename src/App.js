// import React, { useEffect, useState } from 'react';
// import TeamComparisonComponent from './components/TeamComparisonComponent';
// import { getGameDetails, getTeamDetails } from './api';
// import { generateDateRange } from './util/dates';
// import './styles.css';


// // API docs: https://gitlab.com/dword4/nhlapi/-/blob/master/new-api.md


// const App = () => {
//   const [upcomingGameDetails, setUpcomingGameDetails] = useState(null);
//   const [teamDetails, setTeamDetails] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchGameDetails = await getGameDetails();
//         setUpcomingGameDetails(fetchGameDetails);
//       } catch (err) {
//         console.error('Error fetching upcoming game details: ', err);
//       }
//     };

//     const fetchTeamDetails = async () => {
//       try {
//         const fetchTeamDetails = await getTeamDetails();
//         setTeamDetails(fetchTeamDetails);
//       } catch (err) {
//         console.error('Error fetching team details: ', err);
//       }
//     };

//     fetchTeamDetails();
//     fetchData();
//     // Example usage:
//     const inputDate = '2022-01-15';
//     const daysBefore = 3;
//     const daysAfter = 3;

//     const dateRange = generateDateRange(inputDate, daysBefore, daysAfter);
//     console.log(dateRange);
//   }, []);

//   // Check if upcomingGameDetails and games array exist
//   if (!upcomingGameDetails || !upcomingGameDetails.data || !upcomingGameDetails.data.games) {
//     // Return a loading state or handle the absence of data
//     return <p>Loading...</p>;
//   }

//   const games = upcomingGameDetails.data.games;

//   // Function to find team full name based on team ID
//   const getTeamFullName = (teamId) => {
//     const teamDetailsForId = teamDetails?.data?.data;
//     const matchingTeam = teamDetailsForId?.find((team) => team.id === teamId);
//     return matchingTeam?.fullName || `Team with ID ${teamId} not found`;
//   };

//   return (
//     <>
//       <div>
//         <h1>Upcoming Games</h1>
//       </div>
//       { games.map((game, index) => (
//         <TeamComparisonComponent
//           key={ index }
//           homeTeamLogo={ game.homeTeam?.logo || 'defaultHomeLogoURL' }
//           awayTeamLogo={ game.awayTeam?.logo || 'defaultAwayLogoURL' }
//           homeTeam={ getTeamFullName(game.homeTeam?.id) || 'defaultHomeTeamName' }
//           awayTeam={ getTeamFullName(game.awayTeam?.id) || 'defaultAwayTeamName' }
//           recentGameScore={ '3 - 2' } // Example score
//           stats={ {
//             shots: '30 - 25',
//             possession: '60% - 40%',
//             // Add more stats as needed
//           } }
//         />
//       )) }
//     </>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import TeamComparisonComponent from './components/TeamComparisonComponent';
import { getGameDetails, getTeamDetails } from './api';
import { generateDateRange } from './util/dates';
import './styles.css';

const App = () => {
  const [upcomingGameDetails, setUpcomingGameDetails] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchGameDetails = await getGameDetails();
        setUpcomingGameDetails(fetchGameDetails);
      } catch (err) {
        console.error('Error fetching upcoming game details: ', err);
      }
    };

    const fetchTeamDetails = async () => {
      try {
        const fetchTeamDetails = await getTeamDetails();
        setTeamDetails(fetchTeamDetails);
      } catch (err) {
        console.error('Error fetching team details: ', err);
      }
    };

    fetchData();
    fetchTeamDetails();
  }, []);

  useEffect(() => {
    // Example usage ... need inputDate to be /now... so, today...
    const inputDate = '2022-01-15';
    const daysBefore = 2;
    const daysAfter = 2;

    const calculatedDateRange = generateDateRange(inputDate, daysBefore, daysAfter);
    setDateRange(calculatedDateRange);
  }, []);

  // Check if upcomingGameDetails and games array exist
  if (!upcomingGameDetails || !upcomingGameDetails.data || !upcomingGameDetails.data.games) {
    // Return a loading state or handle the absence of data
    return <p>Loading...</p>;
  }

  const games = upcomingGameDetails.data.games;

  // Function to find team full name based on team ID
  const getTeamFullName = (teamId) => {
    const teamDetailsForId = teamDetails?.data?.data;
    const matchingTeam = teamDetailsForId?.find((team) => team.id === teamId);
    return matchingTeam?.fullName || `Team with ID ${teamId} not found`;
  };

  return (
    <>
      <div>
        <h1>Upcoming Games</h1>
      </div>
      { games.map((game, index) => (
        <TeamComparisonComponent
          key={ index }
          homeTeamLogo={ game.homeTeam?.logo || 'defaultHomeLogoURL' }
          awayTeamLogo={ game.awayTeam?.logo || 'defaultAwayLogoURL' }
          homeTeam={ getTeamFullName(game.homeTeam?.id) || 'defaultHomeTeamName' }
          awayTeam={ getTeamFullName(game.awayTeam?.id) || 'defaultAwayTeamName' }
          recentGameScore={ '3 - 2' } // Example score
          stats={ {
            shots: '30 - 25',
            possession: '60% - 40%',
            // Add more stats as needed
          } }
          dateRange={ dateRange } // Pass dateRange to the TeamComparisonComponent
        />
      )) }
    </>
  );
};

export default App;
