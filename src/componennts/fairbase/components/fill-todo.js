import { useState } from 'react';
import styles from '../fairbase.module.css';
import { ref, update } from 'firebase/database';
import { db } from '../../../fairbase';

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

export const FillTodo = ({ index, title, id }) => {
	const [editTodo, setEditTodo] = useState(false);
	const [value, setValue] = useState('');

	const handeleClick = () => {
		setEditTodo(!editTodo);
		if (editTodo && value) {
			const todoDbRefForUpdate = ref(db, `todo/${id}`);
			update(todoDbRefForUpdate, {
				title: value,
			}).then((response) => {
				console.log('PATCH:', response);
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
