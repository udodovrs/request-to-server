import { ref, remove } from 'firebase/database';
import { db } from '../../../fairbase';

export const handleDeleteTodoBtn = (id) => {
	const todoDbRefForDelete = ref(db, `todo/${id}`);
	remove(todoDbRefForDelete).then((response) => {
		console.log('DELETE:', response);
	});
};
