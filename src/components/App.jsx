import React, { useState, createContext, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NotesList from './NotesList';

export const NotesContext = createContext(null);

const useStyles = makeStyles(() => ({
	grid : {
		border    : '1px solid',
		marginTop : '2rem'
	}
}));

export default function App() {
	const classes = useStyles();
	const [ notes, setNotes ] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('notes'));
		if (data) setNotes(data);
	}, []);

	console.log(notes);

	return (
		<div>
			<Typography variant="h3">Notes Manager</Typography>
			<NotesContext.Provider value={{ notes, setNotes }}>
				<Container>
					<Grid container>
						<Grid item sm={4} className={classes.grid}>
							<NotesList />
						</Grid>
						<Grid item sm={8} className={classes.grid}>
							Detail
						</Grid>
					</Grid>
				</Container>
			</NotesContext.Provider>
		</div>
	);
}
