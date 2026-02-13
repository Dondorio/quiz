<script lang="ts">
	interface Question {
		question: string;
		answer: string;
		a: string;
		b: string;
		c: string;
		d: string;
		explanation: string;
	}

	let {
		q,
		name,
		number,
		showAnswer
	}: { q: Question; name: string; number: number; showAnswer: boolean } = $props();

	let selected: string | undefined = $state();

	const isCorrect = (option: string) => {
		return showAnswer ? option === q.answer : false;
	};

	const isWrong = (option: string) => {
		return showAnswer ? selected === option && selected !== q.answer : false;
	};
</script>

<div style="border-style: outset;" class="flex flex-col border-4 p-4 shadow-lg">
	<h1 class="mb-4 text-xl font-bold">{number}. {q.question}</h1>

	<div class="flex flex-col divide-y divide-dashed border">
		{#each ['a', 'b', 'c', 'd'] as option}
			<label
				class:correct={isCorrect(option)}
				class:wrong={isWrong(option)}
				class="flex cursor-pointer items-center gap-3 p-2 hover:bg-gray-50"
			>
				<input
					type="radio"
					{name}
					bind:group={selected}
					value={option}
					class="cursor-pointer"
					disabled={showAnswer}
				/>

				<span class="text-lg">
					<span class="font-semibold uppercase">{option}: </span>
					{q[option as keyof Question]}
				</span>
			</label>
		{/each}
	</div>

	{#if showAnswer}
		<p>
			{q.explanation}
		</p>
	{/if}
</div>

<style lang="postcss">
	@import 'tailwindcss';

	.correct {
		@apply bg-green-200;
	}

	.wrong {
		@apply bg-red-200;
	}

	input[type='radio'] {
		box-sizing: border-box;
		appearance: none;
		background: white;
	}

	input[type='radio']:checked {
		@apply bg-black;
	}

	input[type='radio']:active {
		@apply bg-gray-300;
	}

	input[type='radio']:focus {
		outline: none;
		border: none;
		box-shadow: none;
	}
</style>
