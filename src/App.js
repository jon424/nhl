import React, { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import TeamComparisonComponent from './components/TeamComparisonComponent';
import LoadingSpinner from './components/LoadingSpinner';
import { getGameDetails, getTodaysGameDetails } from './api';
import { generateDateRanges, getTodaysDate } from './util/dates';
import './styles.css';

//https://github.com/Zmalski/NHL-API-Reference
//https://gitlab.com/dword4/nhlapi/-/blob/master/new-api.md


const App = () => {
  const [upcomingGameDetails, setUpcomingGameDetails] = useState(null);
  // const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const games = upcomingGameDetails?.data?.games;
  console.log({ games });

  const { dateRangeFromYesterday, dateRangeFromTomorrow } = generateDateRanges('2023-10-10', '2024-04-18');
  console.log('Date Range from Yesterday:', dateRangeFromYesterday);
  console.log('Date Range from Tomorrow:', dateRangeFromTomorrow);

  const handleNavbarButtonClick = async (buttonText) => {
    setLoading(true);

    try {
      let fetchGameDetails;

      if (buttonText === 'Today') {
        fetchGameDetails = await getTodaysGameDetails();
      } else if (buttonText === 'Previous') {
        fetchGameDetails = await getGameDetails(dateRangeFromYesterday);
      } else if (buttonText === 'Future') {
        fetchGameDetails = await getGameDetails(dateRangeFromTomorrow);
      }

      console.log({ fetchGameDetails });
      setUpcomingGameDetails(fetchGameDetails);
    } catch (err) {
      console.error('Error fetching game details: ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchGameDetails = await getTodaysGameDetails();
        console.log({ fetchGameDetails });
        setUpcomingGameDetails(fetchGameDetails);
      } catch (err) {
        console.error('Error fetching upcoming game details: ', err);
      } finally {
        setLoading(false);
      }
    };

    // API is down for this :-(
    // const fetchTeamDetails = async () => {
    //   try {
    //     const fetchTeamDetails = await getTeamDetails();
    //     setTeamDetails(fetchTeamDetails);
    //   } catch (err) {
    //     console.error('Error fetching team details: ', err);
    //   }
    // };

    // fetchTeamDetails();

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!upcomingGameDetails || !upcomingGameDetails.data || !games || games.length === 0) {
    return <p>No games available.</p>;
  }

  // const getTeamFullName = (teamId) => {
  //   const teamDetailsForId = teamDetails?.data?.data;
  //   const matchingTeam = teamDetailsForId?.find((team) => team.id === teamId);
  //   return matchingTeam?.fullName || null;
  // };

  console.log('Games:', games);

  return (
    <>
      <Navbar onNavbarButtonClick={ handleNavbarButtonClick } />

      <div className="app-container">
        { games.map((dateInfo, dateIndex) => (
          <div key={ dateIndex }>
            { dateInfo.games?.length > 0 && (
              <>
                <div className="date-container">
                  <h1>{ dateInfo.currentDate === getTodaysDate() && dateInfo.games?.length > 1 ? `Today's Games` : dateInfo.currentDate === getTodaysDate() ? `Today's Game` : dateInfo.currentDate }</h1></div>
                { dateInfo.games.map((game, index) => (
                  <TeamComparisonComponent
                    key={ index }
                    date={ game.gameDate }
                    startTime={ game.startTimeUTC }
                    homeTeamLogo={ game.homeTeam?.logo || 'defaultHomeLogoURL' }
                    awayTeamLogo={ game.awayTeam?.logo || 'defaultAwayLogoURL' }
                    // homeTeam={ getTeamFullName(game.homeTeam?.id) || game.homeTeam?.name?.default }
                    homeTeam={ game.homeTeam?.name?.default }
                    // awayTeam={ getTeamFullName(game.awayTeam?.id) || game.awayTeam?.name?.default }
                    awayTeam={ game.awayTeam?.name?.default }
                    goals={ game.goals }
                    homeTeamScore={ game.homeTeam?.score !== undefined ? game.homeTeam.score : '-' }
                    awayTeamScore={ game.awayTeam?.score !== undefined ? game.awayTeam.score : '-' }
                    venue={ game.venue.default }
                  // stats={ {
                  //   shots: '30 - 25',
                  //   possession: '60% - 40%',
                  // } }
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
