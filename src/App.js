import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import Todo from "./Todo.js";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
  
	useEffect(() => {
		db.collection("todos")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setTodos(
					snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
				);
			});
	}, []);

	const addTodo = (e) => {
		e.preventDefault();
		db.collection("todos").add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setTodos([...todos, input]);
		setInput("");
	};
	return (
		<div className="app">
			<h1>Todo List</h1>
			<form action="">
				<FormControl>
					<InputLabel>Write a Todo</InputLabel>
					<Input value={input} onChange={(e) => setInput(e.target.value)} />
				</FormControl>

				<Button
					disabled={!input}
					type="submit"
					onClick={addTodo}
					variant="contained"
					color="primary">
					Add Todo
				</Button>
			</form>

			<ul>
				{todos.map((todo) => (
					<Todo todo={todo} />
				))}
			</ul>
		</div>
	);
}

export default App;
