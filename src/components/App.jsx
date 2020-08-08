import React, { useState, createContext, useEffect } from 'react';
import { Container, Grid, Typography, Toolbar, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NotesList from './NotesList';
import DisplayNote from './DisplayNote';

export const NotesContext = createContext(null);

const useStyles = makeStyles(() => ({
	root     : {
		flexGrow : 1
	},
	header   : {
		padding : '1rem'
	},
	grid     : {
		backgroundColor : '#fff',
		marginTop       : '7rem',
		marginBottom    : '5rem',
		minHeight       : '500px',
		borderRadius    : '6px',
		boxShadow       :
			'0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
	},
	leftGrid : {
		borderRight : '1px solid'
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
			<AppBar>
				<Toolbar>
					<Typography variant="h4" align="center" className={classes.header}>
						Notes Manager
					</Typography>
				</Toolbar>
			</AppBar>

			<NotesContext.Provider value={{ notes, setNotes, selectedNote, setSelectedNote }}>
				<Container>
					<Grid container className={classes.grid}>
						{/* left side */}
						<Grid item sm={4} className={classes.leftGrid}>
							<NotesList />
						</Grid>
						{/* right side */}
						<Grid item sm={8}>
							<DisplayNote />
						</Grid>
					</Grid>
				</Container>
			</NotesContext.Provider>
		</div>
	);
}
