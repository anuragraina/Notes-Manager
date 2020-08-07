import React, { useState, createContext, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NotesList from './NotesList';
import DisplayNote from './DisplayNote';

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
	const [ selectedNote, setSelectedNote ] = useState({});

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('notes'));
		if (data) {
			setNotes(data);
			setSelectedNote(data[0]);
		}
	}, []);

	return (
		<div>
			<Typography variant="h3" align="center">
				Notes Manager
			</Typography>
			<NotesContext.Provider value={{ notes, setNotes, selectedNote, setSelectedNote }}>
				<Container>
					<Grid container>
						<Grid item sm={4} className={classes.grid}>
							<NotesList />
						</Grid>
						<Grid item sm={8} className={classes.grid}>
							<DisplayNote />
						</Grid>
					</Grid>
				</Container>
			</NotesContext.Provider>
		</div>
	);
}
