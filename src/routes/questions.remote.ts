import questions from '../data.json';
import { query } from '$app/server';

function shuffle(arr: any[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return;
}

export const getQuestions = query(async () => {
	const e = Object.entries(questions);
	shuffle(e);
	return e;
});
