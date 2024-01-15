import React, { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import TeamComparisonComponent from './components/TeamComparisonComponent';
import { getGameDetails, getTeamDetails } from './api';
import { generateDateRanges, isFutureDate, isPastDate } from './util/dates';
import './styles.css';

// https://gitlab.com/dword4/nhlapi/-/blob/master/new-api.md

// https://github.com/Zmalski/NHL-API-Reference

const App = () => {
  const [upcomingGameDetails, setUpcomingGameDetails] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);

  const games = upcomingGameDetails?.data?.games;
  console.log({ games }); //

  // const dates = generateDateRange('2023-10-10', '2024-04-18'); // all dates for season
  // need games for todaysDate
  // previous games from yesterday until the beginning of season
  // future games from tomorrow to the end of the season

  const { dateRangeFromYesterday, dateRangeFromTomorrow } = generateDateRanges('2023-10-10', '2024-04-18');
  console.log('Date Range from Yesterday:', dateRangeFromYesterday);
  console.log('Date Range from Tomorrow:', dateRangeFromTomorrow);

  // Example usage:
  // const futureDate = '2024-10-10';
  // const pastDate = '2024-01-01';
  // console.log(isFutureDate(futureDate)); //  true
  // console.log(isFutureDate(pastDate));   //  false
  // console.log(isPastDate(futureDate));    //  false
  // console.log(isPastDate(pastDate));      //  true

  // const dates = ['2024-01-13', '2024-01-12'];
  // console.log({ dates });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchGameDetails = await getGameDetails(['2024-04-18']);
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

    fetchTeamDetails();
    fetchData();
  }, []); // Only dates is in the dependency array now

  // Check if upcomingGameDetails and games array exist
  if (!upcomingGameDetails || !upcomingGameDetails.data || !games) {
    // TODO: make spinner
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
      <Navbar />

      <div className="app-container">
        { games.map((dateInfo, dateIndex) => (
          <div key={ dateIndex }>
            <h1>{ dateInfo.currentDate }</h1>
            {
              dateInfo.games.map((game, index) => (
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
                />
              ))
            }
          </div >
        )) }
      </div>
    </>
  );
};

export default App;
