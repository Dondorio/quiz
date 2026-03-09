import type { Actions, PageServerLoad } from './$types';
import testA from '$lib/data/test-a.json';
import testB from '$lib/data/test-b.json';
import testC from '$lib/data/test-c.json';
import testD from '$lib/data/test-d.json';

const tests: Record<string, any> = {
	'test-a': testA,
	'test-b': testB,
	'test-c': testC,
	'test-d': testD
};

function shuffle(arr: any[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

export interface QuestionType {
	question: string;
	answer: string;
	a: string;
	b: string;
	c: string;
	d: string;
	explanation: string;
}

export const load: PageServerLoad = async ({ url }) => {
	const testName = url.searchParams.get('test') || 'test-a';
	const questions = tests[testName] || testA;
	const e = Object.entries(questions) as [string, QuestionType][];
	shuffle(e);
	return { questions: e, testName };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const testName = (formData.get('testName') as string) || 'test-a';
		const questions = tests[testName];

		let score = 0;
		const answers: Record<string, { chosen: string; correct: string }> = {};

		for (const [key, val] of formData.entries()) {
			if (key === 'testName') continue;
			const userAnswer = val as string;
			const question = questions[key as keyof typeof questions];

			if (question) {
				const correctAnswer = question.answer;
				if (userAnswer === correctAnswer) {
					score++;
				}
				answers[key] = { chosen: userAnswer, correct: correctAnswer };
			}
		}

		return { score, answers };
	}
} satisfies Actions;
