import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import moment from 'moment';

import CreateNote from './CreateNote';
import AutocompleteBar from './AutocompleteBar';
import { NotesContext } from './App';

const useStyles = makeStyles(() => ({
	notesList  : {
		display       : 'flex',
		flexDirection : 'column'
	},
	listHeader : {
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center'
	},
	title      : {
		fontSize : '1rem',
		color    : '#333333',
		margin   : '1rem'
	},
	box        : {
		minHeight : '85vh'
	},
	time       : {
		color        : '#707070',
		paddingRight : '0.5rem'
	}
}));

export default function NotesList() {
	const classes = useStyles();
	const { notes, selectedNote, setSelectedNote } = useContext(NotesContext);

	const handleClick = (note) => {
		setSelectedNote(note);
	};

	return (
		<div className={classes.notesList}>
			<div className={classes.listHeader}>
				<AutocompleteBar />
				<CreateNote />
			</div>
			<Divider />

			{/* Displaying all the notes */}
			{notes.map((note, index) => (
				<Box
					key={note.time}
					onClick={() => handleClick(note)}
					bgcolor={note.time === selectedNote.time ? 'info.main' : ''}
					color={note.time === selectedNote.time ? 'info.contrastText' : ''}
				>
					<Typography className={classes.title} component="p" variant="subtitle2">
						{note.title}
					</Typography>
					<Typography className={classes.time} component="p" variant="caption" align="right" gutterBottom>
						Created {moment(note.time).fromNow()}
					</Typography>
					<Divider />
				</Box>
			))}
		</div>
	);
}
