import React, { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import TeamComparisonComponent from './components/TeamComparisonComponent';
import LoadingSpinner from './components/LoadingSpinner';
import { getGameDetails, getTodaysGameDetails } from './api';
import { generateDateRanges, getTodaysDate } from './util/dates';
import './styles.css';

const App = () => {
  const [upcomingGameDetails, setUpcomingGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const games = upcomingGameDetails?.data?.games || [];
  console.log({ games });

  const { dateRangeFromYesterday, dateRangeFromTomorrow } = generateDateRanges('2024-10-10', '2025-04-18');

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
        setUpcomingGameDetails(fetchGameDetails);
      } catch (err) {
        console.error('Error fetching upcoming game details: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!upcomingGameDetails || !upcomingGameDetails.data || !games.length) {
    return <p>No games available.</p>;
  }

  return (
    <>
      <Navbar onNavbarButtonClick={ handleNavbarButtonClick } />
      <div className="app-container">
        { games.map((dateInfo, dateIndex) => (
          <div key={ dateIndex }>
            { dateInfo.games?.length > 0 && (
              <>
                <div className="date-container">
                  <h1>{ dateInfo.currentDate === getTodaysDate() && dateInfo.games.length > 1 ? `Today's Games` : dateInfo.currentDate }</h1>
                </div>
                { dateInfo.games.map((game, index) => (
                  <TeamComparisonComponent
                    key={ index }
                    date={ game.gameDate }
                    startTime={ game.startTimeUTC }
                    homeTeamLogo={ game.homeTeam?.logo || 'defaultHomeLogoURL' }
                    awayTeamLogo={ game.awayTeam?.logo || 'defaultAwayLogoURL' }
                    homeTeam={ game.homeTeam?.name?.default }
                    awayTeam={ game.awayTeam?.name?.default }
                    goals={ game.goals }
                    homeTeamScore={ game.homeTeam?.score !== undefined ? game.homeTeam.score : '-' }
                    awayTeamScore={ game.awayTeam?.score !== undefined ? game.awayTeam.score : '-' }
                    venue={ game.venue.default }
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
