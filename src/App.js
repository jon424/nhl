import React, { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import TeamComparisonComponent from './components/TeamComparisonComponent';
import { getGameDetails, getTeamDetails } from './api';
import { generateDateRanges } from './util/dates';
import './styles.css';

// https://gitlab.com/dword4/nhlapi/-/blob/master/new-api.md

// https://github.com/Zmalski/NHL-API-Reference

const App = () => {
  const [upcomingGameDetails, setUpcomingGameDetails] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);

  const games = upcomingGameDetails?.data?.games;
  console.log({ games });

  const { dateRangeFromYesterday, dateRangeFromTomorrow } = generateDateRanges('2023-10-10', '2024-04-18');
  console.log('Date Range from Yesterday:', dateRangeFromYesterday);
  console.log('Date Range from Tomorrow:', dateRangeFromTomorrow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchGameDetails = await getGameDetails(dateRangeFromTomorrow);
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
    return matchingTeam?.fullName || null;
  };

  console.log('Games:', games);
  return (
    <>
      <Navbar />

      <div className="app-container">
        { games.map((dateInfo, dateIndex) => (
          <div key={ dateIndex }>
            { dateInfo.games.length > 0 && (
              <>
                <h1>{ dateInfo.currentDate }</h1>
                { dateInfo.games.map((game, index) => (
                  <TeamComparisonComponent
                    key={ index }
                    date={ game.gameDate }
                    startTime={ game.startTimeUTC }
                    homeTeamLogo={ game.homeTeam?.logo || 'defaultHomeLogoURL' }
                    awayTeamLogo={ game.awayTeam?.logo || 'defaultAwayLogoURL' }
                    homeTeam={ getTeamFullName(game.homeTeam?.id) || game.homeTeam?.name?.default }
                    awayTeam={ getTeamFullName(game.awayTeam?.id) || game.awayTeam?.name?.default }
                    homeTeamScore={ game.homeTeam?.score !== undefined ? game.homeTeam.score : '-' }
                    awayTeamScore={ game.awayTeam?.score !== undefined ? game.awayTeam.score : '-' }
                    recentGameScore={ '3 - 2' } // Example score
                    stats={ {
                      shots: '30 - 25',
                      possession: '60% - 40%',
                      // Add more stats as needed
                    } }
                  />
                )) }
              </>
            ) }
          </div>
        )) }
      </div>

    </>
  );
};

export default App;
