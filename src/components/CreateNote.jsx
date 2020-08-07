import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Button, TextField, Typography, Modal, Backdrop, Fade } from '@material-ui/core';

import { NotesContext } from './App';

const useStyles = makeStyles((theme) => ({
	modal  : {
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	},
	paper  : {
		backgroundColor : theme.palette.background.paper,
		border          : '2px solid #3f51b5',
		boxShadow       : theme.shadows[5],
		padding         : theme.spacing(2, 4, 3)
	},
	form   : {
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	},
	text   : {
		width     : '500px',
		marginTop : '1rem'
	},
	button : {
		width     : '50%',
		marginTop : '1.5rem'
	}
}));

export default function CreateNote() {
	const classes = useStyles();

	const { notes } = useContext(NotesContext);
	const [ open, setOpen ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ content, setContent ] = useState('');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{/* Modal is opened on clicking the + icon to add new note */}
			<AddIcon color="primary" fontSize="large" onClick={handleOpen} />
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout : 500
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<form
							className={classes.form}
							onSubmit={() => {
								localStorage.setItem(
									'notes',
									JSON.stringify([ { title, content, time: new Date().getTime() }, ...notes ])
								);
								handleClose();
							}}
						>
							<Typography variant="h5">Create Note</Typography>
							<TextField
								id="title"
								label="Title"
								value={title}
								variant="outlined"
								className={classes.text}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
							<TextField
								id="content"
								label="Content"
								value={content}
								variant="outlined"
								multiline
								rows={10}
								className={classes.text}
								onChange={(e) => setContent(e.target.value)}
								required
							/>
							<Button type="submit" variant="outlined" color="primary" className={classes.button}>
								Add note
							</Button>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
