/* 
Реализую интеграцию LocalStorage с Redux state.
В данном файле будут находится универсальные методы для работы с LocalStorage.
Буду сохранять AccessToken в LocalStorage из Redux (а не в обход Redux).
Сохранение будет происходить в рамках изменения JWT.
И потом AccessToken будет загружен как начальное состояние (чтобы не был null).
Также связь LocalStorage и Redux state будет выполнена путем подписки (при помощи store.subscribe(() => {}) в файле store.ts).
*/

export function loadState<T>(key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return undefined;
		}
		return JSON.parse(jsonState);
	} catch(e) {
		console.error(e);
		return undefined;
	}
}

export function saveState<T>(state: T, key: string) {
	const stringState = JSON.stringify(state);
	localStorage.setItem(key, stringState);
}
