<script lang="ts">
	import Question from '$lib/Question.svelte';
	import { enhance } from '$app/forms';
	import questions from '../data.json';

	let showAnswer = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				let data = result.data;
				if (data == undefined) return;
				showAnswer = true;
				// await update();
			}
		};
	}}
>
	<div class="flex flex-col gap-2 p-2">
		{#each Object.entries(questions) as [k, v], i}
			<Question number={i} q={v} name={k} {showAnswer}></Question>
		{/each}
		<button class="h-20 w-full border-4 text-4xl font-semibold shadow-lg">Submit</button>
	</div>
</form>
