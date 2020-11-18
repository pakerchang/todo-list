import {
	Button,
	createStyles,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Todo.css";

const useStyles = makeStyles((theme) =>
	createStyles({
		paper: {
			position: "absolute",
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
);

function Todo(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const updateTodo = () => {
		db.collection("todos").doc(props.todo.id).set(
			{
				todo: input,
			},
			{ merge: true }
		);
		setOpen(false);
		setInput("");
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<div className={classes.paper}>
					<h1>Open</h1>
					<input
						placeholder={props.todo.todo}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button onClick={(e) => updateTodo()}>Update Todo</button>
				</div>
			</Modal>
			<List className="todo__list">
				<ListItem>
					<ListItemAvatar></ListItemAvatar>
					<ListItemText
						primary={props.todo.todo}
						secondary="Dummy deadline"></ListItemText>
				</ListItem>
				<Button onClick={(e) => setOpen(true)}>Edit</Button>
				<DeleteForeverIcon
					onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
				/>
			</List>
		</>
	);
}

export default Todo;
