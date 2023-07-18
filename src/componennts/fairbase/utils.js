export const getFilterTodo = (filterTodo = [], sortAZ, todo, valueForSearh) => {
	if (sortAZ) {
		filterTodo = [...Object.entries(todo)]
			.sort((a, b) => {
				const titleA = a[1].title.toLowerCase();
				const titleB = b[1].title.toLowerCase();
				if (titleA < titleB) return -1;
				if (titleA > titleB) return 1;
				return 0;
			})
			.filter(([id, { title }]) => {
				return title.toLowerCase().includes(valueForSearh.toLowerCase());
			});
	} else {
		filterTodo = Object.entries(todo).filter(([id, { title }]) => {
			return title.toLowerCase().includes(valueForSearh.toLowerCase());
		});
	}
	return filterTodo;
};
