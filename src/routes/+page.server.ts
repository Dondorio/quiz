import type { Actions } from '@sveltejs/kit';
import questions from '../data.json';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		let score = 0;

		const answers: Record<string, { chosen: string; correct: string }> = Object.fromEntries(
			data.entries().map(([key, val], _) => {
				const userAnswer = val as string;
				const correctAnswer = questions[key as keyof typeof questions].answer;

				if (userAnswer === correctAnswer) {
					score++;
				}

				return [key, { chosen: userAnswer, correct: correctAnswer }];
			})
		);

		console.log(answers);

		return { score, answers };
	}
} satisfies Actions;
