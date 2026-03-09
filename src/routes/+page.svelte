<script lang="ts">
	import Question from '$lib/Question.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import type { QuestionType } from './+page.server';

	interface Answer {
		id: string;
		chosen: string;
		correct: string;
	}

	let { data }: { data: PageData } = $props();

	let questions = $derived(data.questions as [string, QuestionType][]);
	let testName = $derived(data.testName);

	let score = $state(0);
	let answers: Record<string, Answer> | null = $state(null);
	let maxScore = $derived(questions.length);

	function onTestChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		goto(`?test=${target.value}`, { replaceState: true });
		score = 0;
		answers = null;
	}
</script>

{#if answers}
	<div
		style="background-image: linear-gradient(to bottom, #ffffff, rgba(0,0,0,0));"
		class="sticky top-0 z-10 h-20 w-full justify-center p-5 text-center"
	>
		<h1 class="text-5xl">{score}/{maxScore}</h1>
	</div>
{/if}

<div class="mx-auto flex max-w-5xl flex-col gap-6 p-4">
	<div class="flex items-center justify-between p-2">
		<h1 class="text-3xl font-bold">Informatyka Quiz</h1>
		<select
			value={testName}
			onchange={onTestChange}
			class="rounded border p-2 text-xl font-semibold shadow-sm"
		>
			<option value="test-a">Test A</option>
			<option value="test-b">Test B</option>
			<option value="test-c">Test C</option>
			<option value="test-d">Test D</option>
		</select>
	</div>

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					let resData = result.data as unknown as {
						score: any;
						answers: Record<string, Answer>;
					};
					if (resData == undefined) return;
					score = resData.score;
					answers = resData.answers;
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
			};
		}}
	>
		<input type="hidden" name="testName" value={testName} />
		<div class="w-full items-center justify-center">
			<div class="flex flex-col gap-2 p-2">
				{#each questions as [k, v], i (testName + i)}
					<Question number={i + 1} q={v} name={k} answer={answers !== null ? answers[k] : null}
					></Question>
				{/each}
				<button class="h-20 w-full border-4 text-4xl font-semibold shadow-lg">Submit</button>
			</div>
		</div>
	</form>
</div>
