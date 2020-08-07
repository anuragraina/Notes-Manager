import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';

import DisplayNotes from './DisplayNotes';
import Header from './Header';
import Note from './Note';
import CreateArea from './CreateArea';

function App() {
	const [ notes, setNotes ] = useState([]);

	function addNote(newNote) {
		setNotes((prevNotes) => {
			return [ ...prevNotes, newNote ];
		});
	}

	function deleteNote(id) {
		setNotes((prevNotes) => {
			return prevNotes.filter((noteItem, index) => {
				return index !== id;
			});
		});
	}

	return (
		<div>
			<Header />
			<CreateArea onAdd={addNote} />
			{notes.map((noteItem, index) => {
				return (
					<Note
						key={index}
						id={index}
						title={noteItem.title}
						content={noteItem.content}
						onDelete={deleteNote}
					/>
				);
			})}
			<Container>
				<DisplayNotes />
			</Container>
		</div>
	);
}

export default App;
