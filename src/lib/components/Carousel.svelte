<script lang="ts">
	import type { CarouselComponentProps } from '$lib/types';

	const { imgs, hideDots = false, timer = false }: CarouselComponentProps = $props();

	let index = $state(0);
	let resetKey = $state(0);
	let { src, alt } = $derived(imgs[index]);

	function previous() {
		index = index > 0 ? index - 1 : imgs.length - 1;
		resetKey++;
	}

	function next() {
		index = index < imgs.length - 1 ? index + 1 : 0;
		resetKey++;
	}

	$effect(() => {
		if (!timer) return;

		resetKey;

		const interval = setInterval(next, 5000);

		return () => clearInterval(interval);
	});
</script>

<div class="carousel">
	<img {src} alt={alt ?? `Image #${index + 1}`} />
	<div class="buttons-container">
		<button class="button" aria-label="Previous" onclick={previous}>
			<i class="fa-solid fa-arrow-left"></i>
		</button>
		{#if !hideDots}
			<div class="dots">
				{#each imgs as img, i (img.src)}
					<button
						class="dot"
						class:selected={i === index}
						aria-label="Image #{i + 1}"
						onclick={() => {
							index = i;
							resetKey++;
						}}
					></button>
				{/each}
			</div>
		{/if}
		<button class="button" aria-label="Next" onclick={next}>
			<i class="fa-solid fa-arrow-right"></i>
		</button>
	</div>
</div>

<style lang="scss">
	.carousel {
		aspect-ratio: 1/1;
		height: 20rem;

		img {
			aspect-ratio: 1/1;
			height: 100%;
			display: flex;
			justify-self: center;
			object-fit: cover;
		}

		.buttons-container {
			width: 100%;
			height: 20%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			button {
				aspect-ratio: 1/1;
				border-radius: 100%;
				background-color: #a0a0a0;
				border: none;
				cursor: pointer;

				&:hover {
					background-color: var(--main-dark);
				}
			}

			.button {
				width: 2rem;
				color: var(--text-dark);

				&:hover {
					color: var(--text-light);
				}
			}

			.dots {
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				width: 70%;

				.dot {
					width: 0.5rem;

					&.selected {
						width: 1rem;
						background-color: var(--main-dark);
					}
				}
			}
		}
	}
</style>
