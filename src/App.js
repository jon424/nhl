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
  const [previousDate, setPreviousDate] = useState(null);

  const games = upcomingGameDetails?.data?.games;
  console.log(games);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  const todaysDate = `${year}-${month}-${day}`;
  const gameIsToday = games && games.length > 0 && games.some(game => game?.gameDate === todaysDate);



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

    // game date
    if (games && games.length > 0 && !previousDate) {
      setPreviousDate(games[0].gameDate);
    }

    fetchTeamDetails();
    fetchData();
  }, [games, previousDate]);

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

  return (
    <>
      <div>
        <h1>{ gameIsToday ? `Today's Games` : 'gameDate' }</h1>
        {/* <h1>Today's games</h1> */ }
      </div>
      { games.map((game, index) => (
        <div key={ index }>
          { index === 0 && <h1>{ game.gameDate }????????????????????</h1> }
          <TeamComparisonComponent
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
        </div>
      )) }
    </>
  );
};

export default App;
