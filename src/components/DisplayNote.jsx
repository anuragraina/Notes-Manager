import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Input, Typography, Button } from '@material-ui/core';

import { NotesContext } from './App';

const useStyles = makeStyles(() => ({
	title   : {
		fontSize : '2rem',
		padding  : '0.5rem 1rem'
	},
	content : {
		padding      : '1rem',
		paddingRight : '2rem'
	},
	button  : {
		margin : '0.5rem'
	}
}));

export default function DisplayNote() {
	const classes = useStyles();
	const { notes, selectedNote, setSelectedNote } = useContext(NotesContext);
	const [ changed, setChanged ] = useState(false);

	const update = () => {
		notes.forEach((note, index, arr) => {
			if (note.time === selectedNote.time) {
				arr[index] = selectedNote;
				localStorage.setItem('notes', JSON.stringify(arr));

				//page refreshed if title is changed to update the notes list on left
				note.title !== selectedNote.title ? window.location.reload() : setChanged(false);
			}
		});
	};

	const handleChange = (event) => {
		const { id, value } = event.target;

		setSelectedNote((prevNote) => {
			return {
				...prevNote,
				[id] : value
			};
		});

		setChanged(true);
	};

	return notes.length === 0 ? (
		<Typography variant="h5" className={classes.content}>
			Notes not found!!!
		</Typography>
	) : (
		<div>
			<Input
				id="title"
				value={selectedNote.title}
				onChange={handleChange}
				className={classes.title}
				disableUnderline
				fullWidth
				required
			/>
			<Divider />
			<Input
				id="content"
				multiline
				value={selectedNote.content}
				onChange={handleChange}
				className={classes.content}
				disableUnderline
				fullWidth
				required
			/>
			{changed && (
				<Button color="primary" variant="outlined" onClick={update} className={classes.button}>
					Update
				</Button>
			)}
		</div>
	);
}
