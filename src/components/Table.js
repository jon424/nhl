import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(goals) {
    console.log('this is the goals.data: ', goals.data);

    // Group goals by period
    const groupedGoals = goals.data?.reduce((acc, goal) => {
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

    console.log('rows!!!!!: ', rows);
    return (
        <TableContainer component={ Paper }>
            <Table sx={ { minWidth: 650 } } aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell align="right">Goals</TableCell>
                        <TableCell align="right">Scorer</TableCell>
                        <TableCell align="right">Game Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { rows.map((row) => (
                        <TableRow key={ row.period } sx={ { '&:last-child td, &:last-child th': { border: 0 } } }>
                            <TableCell component="th" scope="row">
                                { row.period }
                            </TableCell>
                            <TableCell align="right">
                                { row.homeScore } - { row.awayScore }
                            </TableCell>
                            <TableCell align="right">
                                { row.scorers.map((scorer, index) => (
                                    <div key={ index }>
                                        <img src={ scorer.mugshot } alt={ scorer.name || 'Unknown' } width="30" height="30" />
                                        { scorer.name || 'Unknown' }
                                    </div>
                                )) }
                            </TableCell>
                            <TableCell align="right">{ row.gameScore }</TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
