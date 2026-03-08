<script lang="ts">
	import Question from '$lib/Question.svelte';
	import { enhance } from '$app/forms';
	import { getQuestions } from './questions.remote';

	interface Answer {
		id: string;
		chosen: string;
		correct: string;
	}

	const questions = await getQuestions();

	let score = $state(0);
	let answers: Record<string, Answer> | null = $state(null);
	let maxScore = Object.keys(questions).length;
</script>

<!-- {#if answers} -->
<!-- 	{JSON.stringify(answers, null, 4)} -->
<!-- {/if} -->

{#if answers}
	<div
		style="background-image: linear-gradient(to bottom, #ffffff, rgba(0,0,0,0));"
		class="sticky top-0 h-20 w-full justify-center p-5 text-center"
	>
		<h1 class="text-5xl">{score}/{maxScore}</h1>
	</div>
{/if}

<div class="mx-auto flex max-w-5xl flex-col gap-6 p-4">
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					let data = result.data as unknown as {
						score: any;
						answers: Record<string, Answer>;
					};
					if (data == undefined) return;
					score = data.score;
					answers = data.answers;
					console.log(answers);
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
			};
		}}
	>
		<div class="w-full items-center justify-center">
			<div class="flex flex-col gap-2 p-2">
				{#each questions as [k, v], i}
					<Question number={i + 1} q={v} name={k} answer={answers !== null ? answers[k] : null}
					></Question>
				{/each}
				<button class="h-20 w-full border-4 text-4xl font-semibold shadow-lg">Submit</button>
			</div>
		</div>
	</form>
</div>
