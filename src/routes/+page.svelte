<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	import type { Image, CardComponentDeclaration } from '$lib/types';

	import Carousel from '$lib/components/Carousel.svelte';
	import Card from '$lib/components/Card.svelte';

	import videoHeader from '$lib/assets/videos/VideoHeader.mp4';
	import logo from '$lib/assets/logos/50states.svg';
	import transparentLogo from '$lib/assets/logos/50statesTransparent.svg';
	import circleLogo from '$lib/assets/logos/50statesCircle.svg';

	import mountRushmore from '$lib/assets/images/MountRushmore.jpeg';
	import alaskaCruise from '$lib/assets/images/AlaskaCruise.jpeg';
	import yellowstone from '$lib/assets/images/Yellowstone.jpeg';
	import route66 from '$lib/assets/images/Route66.jpg';
	import statueOfLiberty from '$lib/assets/images/StatueOfLiberty.jpeg';
	import rooster from '$lib/assets/images/CoolKeyWestRooster.jpeg';

	let { form }: PageProps = $props();

	const carouselImgs: Image[] = [
		{
			src: mountRushmore,
			alt: 'Mount Rushmore'
		},
		{
			src: alaskaCruise,
			alt: 'Alaska'
		},
		{
			src: yellowstone,
			alt: 'Yellowstone'
		}
	];

	const inspirations: CardComponentDeclaration[] = [
		{
			img: {
				src: route66,
				alt: 'Route 66'
			},
			title: 'Route 66 Roadtrip'
		},
		{
			img: {
				src: statueOfLiberty,
				alt: 'The Statue of Liberty'
			},
			title: 'Weekend in New York City'
		},
		{
			img: {
				src: rooster,
				alt: 'Key West'
			},
			title: 'Explore the Florida Keys'
		}
	];

	const reasons: CardComponentDeclaration[] = [
		{
			title: 'We are travelers too!',
			children:
				'We have a passion for traveling and the expertise required to book memorable trips.'
		},
		{
			title: 'Deeply Personalized Trips',
			children: 'We listen to what you want out of your trip and plan your dreams.'
		},
		{
			title: 'Trusted Partnerships',
			children: 'We work with reliable airlines, hotels, tour providers, and many more!'
		},
		{
			title: 'Direct Contact',
			children:
				'We work with you close, before, during, and after your trip to ensure satisfaction.'
		}
	];

	const imgs: Image[] = [
		{
			src: logo
		},
		{
			src: transparentLogo
		},
		{
			src: circleLogo,
			alt: 'My favorite logo'
		}
	];

	let subject = $state('');
	let message = $state('');
</script>

<section id="header">
	<video autoplay muted loop>
		<source src={videoHeader} type="video/mp4" />
	</video>
	<div class="overlay">
		<h1>Your next adventure is waiting.</h1>
		<p>Let us help make your dream trip a reality.</p>
	</div>
</section>

<section id="about">
	<div class="content-container">
		<h1>About Us</h1>
		<p>
			50 States Travel began as one family's pursuit to visit every U.S. state and now that we've
			completed our journey, we are ready to start yours. Our expert knowledge and complete
			itineraries will guide you through this very diverse country. From cruising to Alaska,
			roadtripping through national parks, or relaxing on the sandy beaches of Florida, we've done
			it all and you can too.
		</p>
	</div>
	<Carousel imgs={carouselImgs} timer></Carousel>
</section>

<section id="inspirations" class="dark">
	<div class="content-container">
		<h1>Inspirations</h1>
		<p>Having troubles deciding where to go next? Here are some ideas!</p>
		<ul class="card-container">
			{#each inspirations as { img, title, children = "" }}
				<li>
					<Card
						{img}
						{title}
						button={{
							label: 'Personalize',
							subject: `Inquiry about ${title}`,
							message: `I would like to personalize a trip based on the ${title} inspiration. Please provide more information.`,
							redirect: '#contact'
						}}
						bind:subject
						bind:message>{@html children}</Card
					>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section id="why">
	<div class="content-container">
		<h1>Why Choose Us?</h1>
		<p>Choosing the right travel partner makes all the difference!</p>
		<ul class="grid-container">
			{#each reasons as { img, title, children }}
				<li>
					<Card {img} {title} horizontal>{@html children}</Card>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section id="contact" class="dark">
	<div class="content-container">
		<h1>Contact Us!</h1>
		{#if form?.success}
			<p>Thank you for reaching out! We'll get back to you as soon as possible.</p>
		{:else}
			<p>
				{form?.message ??
					'Ready to start planning out your next trip? Contact us for a free consultation!'}
			</p>
		{/if}
		<form method="POST" use:enhance>
			<label>
				Email
				<input type="email" name="email" placeholder="Email" />
			</label>
			<label>
				First Name
				<input type="text" name="firstName" placeholder="First Name" />
			</label>
			<label>
				Last Name
				<input type="text" name="lastName" placeholder="Last Name" />
			</label>
			<label>
				Subject
				<input type="text" name="subject" placeholder="Subject" value={subject} />
			</label>
			<label>
				Message
				<textarea name="message" placeholder="Super awesome trip plan">{message}</textarea>
			</label>
			<div class="button-container">
				<button type="submit">Send</button>
			</div>
		</form>
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.content-container {
			margin: 2rem;
		}

		&:not(#header) {
			padding: 6rem 2rem;

			&:nth-child(odd) {
				background: #504128;
				color: var(--text-light);
			}
		}

		&#header {
			video {
				width: 100%;
			}

			.overlay {
				aspect-ratio: 16/9;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				position: absolute;
				top: 0;
				right: 0;
				width: 100%;

				background-color: rgba(0, 0, 0, 0.5);

				h1,
				p {
					color: var(--text-light);
				}
			}
		}

		&#about {
			display: flex;
			align-items: center;

			h1,
			p {
				text-align: left;
			}
		}

		&#inspirations {
			ul.card-container {
				padding: 0;
				margin: 0;
				list-style-type: none;
				display: flex;
				justify-content: space-evenly;
				gap: 2rem;
			}
		}

		&#why {
			ul.grid-container {
				padding: 0;
				margin: 0;
				list-style-type: none;
				display: grid;
				grid-template-rows: 1fr 1fr;
				grid-template-columns: 1fr 1fr;
				place-items: center;
				gap: 2rem;
			}
		}

		&#contact {
			form {
				display: flex;
				flex-direction: column;
				gap: 2rem;

				label {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-weight: bold;

					input {
						margin-top: 0.5rem;
						padding: 0.5rem;
						border: none;
						border-radius: 5px;
						width: 300px;
					}

					textarea {
						margin-top: 0.5rem;
						padding: 0.5rem;
						border: none;
						border-radius: 5px;
						width: 500px;
						height: 150px;
						resize: none;
					}
				}

				button {
					width: fit-content;
					padding: 0.5rem 1rem;
					border: none;
					border-radius: 5px;
					background-color: var(--main-light);
					color: var(--text-dark);
					font-weight: bold;
					cursor: pointer;
				}
			}
		}
	}
</style>
