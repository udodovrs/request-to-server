import { useState, useEffect } from 'react';
import styles from './jsonServer.module.css';

export const JsonServer = () => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [updateTodo, setUpdateTodo] = useState(false);
	const [sortAZ, setSortAZ] = useState(false);
	const [isInputForSetNewTodo, setIsInputForSetNewTodo] = useState(false);
	const [valueForNewTodo, setValueForNewTodo] = useState('');
	const [valueForSearh, setValueForSearch] = useState('');
	const [isRunJsonServer, setIsRunJsonServer] = useState(false);

	const executeUpdateTodo = () => setUpdateTodo(!updateTodo);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todo')
			.then((response) => response.json())
			.then((json) => setTodo(json))
			.catch((error) => {
				console.error(error);
				setIsRunJsonServer(true);
			})
			.finally(() => setIsLoading(false));
	}, [updateTodo]);

	const InputForEdit = ({ value, setValue }) => {
		return (
			<input
				type="text"
				name="edit"
				value={value}
				onChange={({ target }) => setValue(target.value)}
				className={styles.inputForEdit}
			/>
		);
	};

	const FillTodo = ({ index, title, id }) => {
		const [editTodo, setEditTodo] = useState(false);
		const [value, setValue] = useState('');

		const handeleClick = () => {
			setEditTodo(!editTodo);
			if (editTodo && value) {
				fetch(`http://localhost:3005/todo/${id}`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						title: value,
					}),
				})
					.then((rawResponse) => rawResponse.json())
					.then((response) => {
						console.log('PATCH:', response);
						executeUpdateTodo(!updateTodo);
					});
			}
		};

		return (
			<>
				<span className={styles.numder}>{index + 1}</span>
				{editTodo ? (
					<InputForEdit value={value} setValue={setValue} />
				) : (
					<span className={styles.title}>{title}</span>
				)}
				<button className={styles.btn} onClick={handeleClick}>
					{editTodo ? 'Обновить' : 'Редактировать'}
				</button>
			</>
		);
	};

	const handleDeleteBtn = (id) => {
		fetch(`http://localhost:3005/todo/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('DELETE:', response);
				executeUpdateTodo(!updateTodo);
			});
	};

	const handleSetNewTodo = (value) => {
		setIsInputForSetNewTodo(!isInputForSetNewTodo);
		if (isInputForSetNewTodo && value) {
			fetch(`http://localhost:3005/todo`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					userId: 1,
					title: value,
					completed: false,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log('POST:', response);
					executeUpdateTodo(!updateTodo);
					setValueForNewTodo('');
				});
		}
	};

	let filterTodo = null;

	if (sortAZ) {
		filterTodo = [...todo]
			.sort((a, b) => {
				const titleA = a.title.toLowerCase();
				const titleB = b.title.toLowerCase();
				if (titleA < titleB) return -1;
				if (titleA > titleB) return 1;
				return 0;
			})
			.filter(({ title }) => {
				return title.toLowerCase().includes(valueForSearh.toLowerCase());
			});
	} else {
		filterTodo = todo.filter(({ title }) => {
			return title.toLowerCase().includes(valueForSearh.toLowerCase());
		});
	}

	return (
		<>
		{isRunJsonServer && <h2> Запустите Json Server на 3005 порту</h2>}
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.wrapper}>
					<button className={styles.btn} onClick={() => setSortAZ(!sortAZ)}>
						{sortAZ ? 'По порядку' : 'По алфовиту'}
					</button>
					<input
						type="text"
						name="search"
						placeholder="Поиск"
						value={valueForSearh}
						onChange={({ target }) => setValueForSearch(target.value)}
						className={styles.inputForEdit}
					/>
					{filterTodo.map(({ id, title }, index) => (
						<div key={id} className={styles.todo}>
							<FillTodo index={index} title={title} id={id} />
							<button
								className={styles.btn}
								onClick={() => handleDeleteBtn(id)}
							>
								Удалить
							</button>
						</div>
					))}
					{isInputForSetNewTodo && (
						<input
							type="text"
							value={valueForNewTodo}
							className={styles.inputForEdit}
							onChange={({ target }) => setValueForNewTodo(target.value)}
						/>
					)}
					<button
						className={styles.btn}
						onClick={() => handleSetNewTodo(valueForNewTodo)}
					>
						{isInputForSetNewTodo ? 'Создать задачу' : 'Новая задача'}
					</button>
				</div>
			)}
		</>
	);
};
