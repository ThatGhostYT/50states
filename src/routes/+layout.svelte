<script lang="ts">
	import '$lib/styles/global.scss';
	import compactLogo from '$lib/assets/logos/50statesCompact.svg';
	import transparentLogo from '$lib/assets/logos/50statesTransparent.svg';

	let { children } = $props();

	const ids = ['about', 'inspirations', 'why', 'contact'];
</script>

<svelte:head>
	<title>50 States Travel</title>
	<link rel="icon" href={compactLogo} />
	<script src="https://kit.fontawesome.com/851abbe342.js" crossorigin="anonymous"></script>
</svelte:head>

<header>
	<a href="/">
		<img src={transparentLogo} alt="Logo" />
	</a>
	<nav>
		<ul>
			{#each ids as id (id)}
				<li><a href="/#{id}">{id.charAt(0).toUpperCase() + id.slice(1)}</a></li>
			{/each}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style lang="scss">
	header {
		position: fixed;
		top: 0;
		background: var(--main-light);
		padding: 0 2rem;
		width: 100%;
		height: 6rem;

		display: flex;
		justify-content: space-between;
		align-items: center;

		img {
			height: 5rem;
		}

		nav {
			display: flex;
			align-items: center;

			ul {
				display: flex;
				padding: 0;
				margin: 0;
				list-style-type: none;
				align-items: center;
				gap: 2rem;
				padding: 0 2rem;
			}
		}
	}
</style>
