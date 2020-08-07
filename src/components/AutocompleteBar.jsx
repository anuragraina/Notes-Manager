import React, { useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { NotesContext } from './App';
import useOutsideClick from './useOutsideClick';

const useStyles = makeStyles(() => ({
	input      : {
		border       : '1px solid #ccc',
		borderRadius : '50px',
		width        : '80%',
		margin       : '0.5rem'
	},

	searchIcon : {
		color      : '#a9a9a9',
		marginLeft : '0.5rem'
	},
	optionList : {
		marginTop       : '0.1rem',
		position        : 'absolute',
		paddingLeft     : '4%',
		width           : '21%',
		borderRadius    : '15px 15px 50px 50px',
		backgroundColor : 'white',
		boxShadow       : '0 3px 5px 2px #a9a9a9'
	},
	options    : {
		fontFamily : 'Segoe UI',
		cursor     : 'default'
	}
}));

export default function AutocompleteBar() {
	const classes = useStyles();
	const { notes, setSelectedNote } = useContext(NotesContext);
	const [ search, setSearch ] = useState('');
	const [ display, setDisplay ] = useState(false);
	const ref = useRef();

	//Close the autocomplete if clicked outside
	useOutsideClick(ref, () => {
		setDisplay(false);
	});

	return (
		<div className={classes.input} ref={ref}>
			<div>
				<Input
					disableUnderline
					id="input-with-icon-adornment"
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon className={classes.searchIcon} />
						</InputAdornment>
					}
					onClick={() => setDisplay(!display)}
					onChange={(e) => {
						setSearch(e.target.value);
						setDisplay(true);
					}}
					value={search}
				/>
			</div>

			{display && (
				<div className={classes.optionList}>
					{/* Displaying available notes in autocomplete by searching the notes array. */}
					{notes.filter(({ title }) => title.toLowerCase().indexOf(search.toLowerCase()) > -1).map((note) => {
						return (
							<div
								className={classes.options}
								key={note.time}
								onClick={() => {
									setDisplay(false);
									setSearch(note.title);
									setSelectedNote(note);
								}}
							>
								{note.title}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
