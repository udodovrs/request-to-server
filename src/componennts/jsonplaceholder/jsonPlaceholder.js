import { useState, useEffect } from 'react';
import styles from './jsonPlaceholder.module.css';

export const JsonPlaceholder = () => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((json) => setTodo(json))
			.catch((error) => console.error(error))
			.finally(setIsLoading(false));
	}, []);

	return (
		<>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.wrapper}>
					{todo.map(({ id, title }) => (
						<div key={id} className={styles.todo}>
							{id} - {title}
						</div>
					))}
				</div>
			)}
		</>
	);
};
