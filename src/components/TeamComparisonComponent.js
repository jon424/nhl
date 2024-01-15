import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from './Table';
import { convertToEasternAndPacific } from '../util/times';

import '../styles.css';

const TeamComparisonComponent = ({ date, startTime, homeTeamLogo, awayTeamLogo, homeTeam, awayTeam, goals, homeTeamScore, awayTeamScore, stats, dateRange }) => {
  const utcTime = startTime;
  const { easternTime, pacificTime } = convertToEasternAndPacific(utcTime);

  console.log('shoots? scores?: ', goals);

  return (
    <div className="grid-container">
      <Grid container spacing={ 3 }>
        {/* Team 1 */ }
        <Grid item xs={ 6 } container direction="column" alignItems="center">
          <img src={ homeTeamLogo } alt={ `${homeTeam} Logo` } style={ { maxWidth: '50%', height: 'auto' } } />
          <div className="team-info">
            <Typography variant="h5" gutterBottom style={ { textAlign: 'center' } }>
              { homeTeam }
            </Typography>
            {/* Display the score for Team 1 */ }
            <Typography className="team-score" variant="h6" gutterBottom style={ { textAlign: 'center' } }>
              { homeTeamScore }
            </Typography>
          </div>
        </Grid>

        {/* Team 2 */ }
        <Grid item xs={ 6 } container direction="column" alignItems="center">
          <img src={ awayTeamLogo } alt={ `${awayTeam} Logo` } style={ { maxWidth: '50%', height: 'auto' } } />
          <div className="team-info">
            <Typography variant="h5" gutterBottom style={ { textAlign: 'center' } }>
              { awayTeam }
            </Typography>
            {/* Display the score for Team 2 */ }
            <Typography className="team-score" variant="h6" gutterBottom style={ { textAlign: 'center' } }>
              { awayTeamScore }
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div className="table-container"><Table homeTeam={ homeTeam } awayTeam={ awayTeam } goals={ goals } /></div>

      {/* Stats */ }
      <div>
        <p>{ easternTime } ET | { pacificTime } PT</p>
        {/* { Object.entries(stats).map(([key, value]) => (
          <Typography key={ key } variant="body2" color="textSecondary" gutterBottom>
            { `${key}: ${value}` }
          </Typography>
        )) } */}
      </div>
    </div>
  );



};

export default TeamComparisonComponent;
