import React, { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import TeamComparisonComponent from './components/TeamComparisonComponent';
import LoadingSpinner from './components/LoadingSpinner';
import { getTodaysGameDetails, getGameDetails } from './api';
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

  if (!upcomingGameDetails || !upcomingGameDetails.data || !games || games.length === 0) {
    return <p>No games available.</p>;
  }

  // const getTeamFullName = (teamId) => {
  //   const teamDetailsForId = teamDetails?.data?.data;
  //   const matchingTeam = teamDetailsForId?.find((team) => team.id === teamId);
  //   return matchingTeam?.fullName || null;
  // };

  console.log('Games:', games);
  // console.log('Games.data.games:', games[0].data?.games);
  return (
    <>
      <Navbar onNavbarButtonClick={ handleNavbarButtonClick } />
      { loading && <LoadingSpinner /> }
      <div className="app-container">
        { games.map((game, gameIndex) => (
          <div key={ gameIndex }>
            { game.data?.games[gameIndex]?.games?.length > 0 && (
              <>
                <div className="date-container">
                  <h1>
                    { game.data?.games[gameIndex]?.games?.length > 1
                      ? `Today's Games`
                      : game.data?.games[gameIndex]?.games?.currentDate === getTodaysDate()
                        ? `Today's Game`
                        : game.data?.games[gameIndex]?.games?.currentDate }
                  </h1>
                </div>
                { game.data?.games[gameIndex]?.games.map((innerGame, index) => (
                  <React.Fragment key={ index }>
                    <div>{ index }</div>
                    <TeamComparisonComponent
                      date={ innerGame.gameDate }
                      startTime={ innerGame.startTimeUTC }
                      homeTeamLogo={
                        innerGame.homeTeam?.logo || 'defaultHomeLogoURL'
                      }
                      awayTeamLogo={
                        innerGame.awayTeam?.logo || 'defaultAwayLogoURL'
                      }
                      homeTeam={ innerGame.homeTeam?.name?.default }
                      awayTeam={ innerGame.awayTeam?.name?.default }
                      goals={ innerGame.goals }
                      homeTeamScore={
                        innerGame.homeTeam?.score !== undefined
                          ? innerGame.homeTeam.score
                          : '-'
                      }
                      awayTeamScore={
                        innerGame.awayTeam?.score !== undefined
                          ? innerGame.awayTeam.score
                          : '-'
                      }
                      venue={ innerGame.venue?.default }
                    />
                    <div style={ { border: "1px solid red" } }>
                      { innerGame.gameDate }???
                    </div>
                  </React.Fragment>
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
