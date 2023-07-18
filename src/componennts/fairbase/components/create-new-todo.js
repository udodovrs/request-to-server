import { ref, push } from 'firebase/database';
import { db } from '../../../fairbase';

export const handleSetNewTodo = (
	value,
	setIsInputForSetNewTodo,
	isInputForSetNewTodo,
	setValueForNewTodo,
) => {
	setIsInputForSetNewTodo(!isInputForSetNewTodo);
	const todoDbRef = ref(db, 'todo');
	if (isInputForSetNewTodo && value) {
		push(todoDbRef, {
			userId: 1,
			title: value,
			completed: false,
		}).then((response) => {
			console.log('POST:', response);
			setValueForNewTodo('');
		});
	}
};
