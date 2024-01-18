import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BasicTable({ homeTeam, awayTeam, goals }) {
    console.log('this is the goals.data: ', goals);

    // Group goals by period
    const groupedGoals = goals?.reduce((acc, goal) => {
        const period = goal.period;
        if (!acc[period]) {
            acc[period] = [];
        }
        acc[period].push(goal);
        return acc;
    }, {});

    // Flatten the grouped goals into rows
    const rows = Object.entries(groupedGoals || {}).flatMap(([period, periodGoals]) => {
        // Use the last goal for each period
        const lastGoal = periodGoals[periodGoals.length - 1];

        return [
            {
                period,
                homeScore: lastGoal.homeScore,
                awayScore: lastGoal.awayScore,
                scorers: periodGoals.map((goal) => ({ name: goal.name.default, mugshot: goal.mugshot })),
                gameScore: lastGoal.gameScore,
            },
        ];
    });

    // console.log('rows!!!!!: ', rows);

    // Use the theme and media query hook
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <TableContainer component={ Paper }>
            <Table sx={ { minWidth: 650 } }>
                <TableHead>
                    <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell align="left">Goals</TableCell>
                        {/* <TableCell align="right">Scorer</TableCell> */ }
                        <TableCell align="left">Game Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { rows.map((row) => (
                        <TableRow key={ row.period } sx={ { '&:last-child td, &:last-child th': { border: 0 } } }>
                            <TableCell component="th" scope="row">
                                { row.period }
                            </TableCell>
                            <TableCell align={ isMobile ? 'center' : 'left' }>
                                { row.scorers.map((scorer, index) => (
                                    <div key={ index } style={ { textAlign: isMobile ? 'center' : 'left' } }>
                                        <img src={ scorer.mugshot } alt={ scorer.name || 'Unknown' } width="40" height="40" />
                                        <div className="scorer-name">{ scorer.name || 'Unknown' }</div>
                                    </div>
                                )) }
                            </TableCell>
                            <TableCell align="left">
                                { homeTeam } - { row.homeScore }
                                <br />
                                { awayTeam } - { row.awayScore }
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
