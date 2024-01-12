import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import '../styles.css';

const TeamComparisonComponent = ({ homeTeamLogo, awayTeamLogo, homeTeam, awayTeam, recentGameScore, stats }) => {
  return (
    <>
      <div className="grid-container">
        <Grid container spacing={ 3 }>
          {/* Team 1 */ }
          <Grid item xs={ 6 }>
            <img src={ homeTeamLogo } alt={ `${homeTeam} Logo` } style={ { maxWidth: '100%', height: 'auto' } } />
            <Typography variant="h5" gutterBottom style={ { textAlign: 'center' } }>
              { homeTeam }
            </Typography>
          </Grid>
          {/* Team 2 */ }
          <Grid item xs={ 6 }>
            <img src={ awayTeamLogo } alt={ `${awayTeam} Logo` } style={ { maxWidth: '100%', height: 'auto' } } />
            <Typography variant="h5" gutterBottom style={ { textAlign: 'center' } }>
              { awayTeam }
            </Typography>
          </Grid>
        </Grid>

        {/* Final Scores */ }
        <Typography variant="h5" gutterBottom style={ { textAlign: 'center' } }>
          Final Score: { recentGameScore }
        </Typography>

        {/* Stats */ }
        <div>
          { Object.entries(stats).map(([key, value]) => (
            <Typography key={ key } variant="body2" color="textSecondary" gutterBottom>
              { `${key}: ${value}` }
            </Typography>
          )) }
        </div>
      </div>
    </>
  );
};

export default TeamComparisonComponent;

