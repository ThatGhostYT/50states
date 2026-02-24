<script lang="ts">
	import type { CardComponentProps } from '$lib/types';

	let {
		children,
		title,
		img,
		horizontal = false,
		button = false,
		subject = $bindable(''),
		message = $bindable('')
	}: CardComponentProps = $props();
</script>

<div class="card" class:horizontal>
	{#if img}
		<div class="image-container">
			<img src={img.src} alt={img.alt ?? 'Card Image'} />
			{#if !horizontal}
				<div class="overlay">{title}</div>
			{/if}
		</div>
	{/if}
	<div class="children-container">
		{#if horizontal}
			<h1>{title}</h1>
		{/if}
		{#if children}
			{@render children()}
		{/if}
		{#if button}
			{#if button.redirect}
				<a
					class="button"
					href={button.redirect}
					onclick={() => {
						subject = button.subject;
						message = button.message;
					}}
				>
					{button.label}
				</a>
			{:else}
				<button
					class="button"
					onclick={() => {
						subject = button.subject;
						message = button.message;
					}}
				>
					{button.label}
				</button>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.card {
		display: grid;
		background-color: var(--main-light);
		border-radius: 25px;

		.image-container {
			aspect-ratio: 1/1;
			overflow: hidden;

			img {
				object-fit: cover;
			}
		}

		.children-container {
			color: var(--text-dark);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.button {
				text-decoration: none;
				background-color: var(--main-dark);
				color: var(--text-light);
				padding: 0.75rem 1.5rem;
				border-radius: 12px;
				border: none;
				cursor: pointer;
				font-weight: bold;
				text-align: center;
				margin: 1rem;
			}
		}

		&:not(.horizontal) {
			grid-template-rows: auto 1fr;
			aspect-ratio: 9/16;
			height: 20rem;

			.image-container {
				position: relative;
				width: 100%;
				max-width: 100%;

				.overlay {
					aspect-ratio: 1/1;
					width: 100%;
					position: absolute;
					top: 0;
					right: 0;
					display: flex;
					align-items: flex-end;
					justify-content: center;
					padding: 1rem;
					background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 60%);
					font-weight: bold;
				}

				img {
					aspect-ratio: 1/1;
					width: 100%;
					border-radius: 25px 25px 0 0;
				}
			}
		}

		&.horizontal {
			grid-template-columns: auto 1fr;
			aspect-ratio: 16/9;
			width: 30rem;

			.image-container {
				height: 100%;
				max-height: 100%;

				img {
					aspect-ratio: 1/1;
					height: 100%;
					border-radius: 25px 0 0 25px;
				}
			}

			.children-container {
				flex-direction: column;
			}
		}
	}
</style>
