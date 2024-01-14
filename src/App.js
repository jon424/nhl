import React, { useEffect, useState } from 'react';
import TeamComparisonComponent from './components/TeamComparisonComponent';
import { getGameDetails, getTeamDetails } from './api';
import { generateDateRange } from './util/dates';
import './styles.css';

// https://gitlab.com/dword4/nhlapi/-/blob/master/new-api.md

// https://github.com/Zmalski/NHL-API-Reference

const App = () => {
  const [upcomingGameDetails, setUpcomingGameDetails] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);

  const games = upcomingGameDetails?.data?.games; // <-- data that is returned from getGameDetails()
  console.log({ games }); // Array ... games[0].games (for one date) and games[1].games for the next

  // const today = new Date();
  // const year = today.getFullYear();
  // const month = (today.getMonth() + 1).toString().padStart(2, '0');
  // const day = today.getDate().toString().padStart(2, '0');

  // const todaysDate = `${year}-${month}-${day}`;
  // const gameIsToday = games && games.length > 0 && games.some(game => game?.gameDate === todaysDate);

  // const dates = ['2023-12-15', '2023-12-14', '2023-12-13'];

  const dates = ['now', '2024-01-12']; // need to get starting/ending dates of season...

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const fetchGameDetails = await getGameDetails(); // fetchGameDetails{}
        const fetchGameDetails = await getGameDetails(dates);
        // console.log({ fetchGameDetails });
        setUpcomingGameDetails(fetchGameDetails);
        console.log({ upcomingGameDetails });
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

    fetchTeamDetails();
    fetchData();
  }, [games, dates]);

  // Check if upcomingGameDetails and games array exist
  if (!upcomingGameDetails || !upcomingGameDetails.data || !games) {
    // Return a loading state or handle the absence of data
    return <p>Loading...</p>;
  }

  // Function to find team name based on team ID
  const getTeamFullName = (teamId) => {
    const teamDetailsForId = teamDetails?.data?.data;
    const matchingTeam = teamDetailsForId?.find((team) => team.id === teamId);
    return matchingTeam?.fullName || `Team with ID ${teamId} not found`;
  };

  console.log('Games:', games);
  return (
    <>
      <div>
        {/* <h1>{ gameIsToday ? `Today's Games` : 'gameDate' }</h1> */ }
        {/* <h1>Today's games</h1> */ }
      </div>
      { games.map((dateInfo, dateIndex) => (
        <div key={ dateIndex }>
          <h1>{ dateInfo.currentDate }</h1>
          { dateInfo.games.map((game, index) => (
            <TeamComparisonComponent
              key={ index }
              date={ game.gameDate }
              startTime={ game.startTimeUTC }
              homeTeamLogo={ game.homeTeam?.logo || 'defaultHomeLogoURL' }
              awayTeamLogo={ game.awayTeam?.logo || 'defaultAwayLogoURL' }
              homeTeam={ getTeamFullName(game.homeTeam?.id) || 'defaultHomeTeamName' }
              awayTeam={ getTeamFullName(game.awayTeam?.id) || 'defaultAwayTeamName' }
              homeTeamScore={ game.homeTeam?.score !== undefined ? game.homeTeam.score : '-' }
              awayTeamScore={ game.awayTeam?.score !== undefined ? game.awayTeam.score : '-' }
              recentGameScore={ '3 - 2' } // Example score
              stats={ {
                shots: '30 - 25',
                possession: '60% - 40%',
                // Add more stats as needed
              } }
              dateRange={ generateDateRange(game.gameDate, 3, 3) } // Pass dateRange to the TeamComparisonComponent
            />
          )) }
        </div>
      )) }
    </>
  );


};

export default App;
