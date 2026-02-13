import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const d = data.entries().toArray();
		console.log(`${d}`);
		// const answers = d.map((i) => questions[i[0]].question);
		return { success: true, d };
	}
} satisfies Actions;
