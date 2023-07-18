import { useState, useEffect } from 'react';
import styles from './fairbase.module.css';
import { ref, onValue} from 'firebase/database';
import { db } from '../../fairbase';
import { FillTodo } from './components/fill-todo';
import { handleDeleteTodoBtn } from './components/delete-todo';
import { handleSetNewTodo } from './components/create-new-todo';
import { getFilterTodo } from './utils';

export const Firebase = () => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sortAZ, setSortAZ] = useState(false);
	const [isInputForSetNewTodo, setIsInputForSetNewTodo] = useState(false);
	const [valueForNewTodo, setValueForNewTodo] = useState('');
	const [valueForSearh, setValueForSearch] = useState('');

	useEffect(() => {
		const todoDbRef = ref(db, 'todo');
		setIsLoading(true);
		return onValue(todoDbRef, (snapshot) => {
			const loadedTodo = snapshot.val() || [];
			setTodo(loadedTodo);
			setIsLoading(false);
		});
	}, []);

	const filteredTodos = getFilterTodo([], sortAZ, todo, valueForSearh);

	return (
		<>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.wrapper}>
					<button
						className={styles.btn}
						onClick={() => {
							setSortAZ(!sortAZ);
							getFilterTodo([], sortAZ, todo, valueForSearh);
						}}
					>
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
					{filteredTodos.map(([id, { title }], index) => (
						<div key={id} className={styles.todo}>
							<FillTodo index={index} title={title} id={id} />
							<button
								className={styles.btn}
								onClick={() => handleDeleteTodoBtn(id)}
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
						onClick={() =>
							handleSetNewTodo(
								valueForNewTodo,
								setIsInputForSetNewTodo,
								isInputForSetNewTodo,
								setValueForNewTodo,
							)
						}
					>
						{isInputForSetNewTodo ? 'Создать задачу' : 'Новая задача'}
					</button>
				</div>
			)}
		</>
	);
};
