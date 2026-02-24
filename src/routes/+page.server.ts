import type { Actions } from './$types';
import { followUpHTMLContent, sendEmail } from '$lib/packages/email';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const name = {
			first: data.get('firstName')?.toString(),
			last: data.get('lastName')?.toString()
		};
		const subject = data.get('subject')?.toString() || 'New Contact Form Submission';
		const message = data.get('message')?.toString();

		if (!email)
			return {
				success: false,
				message: 'An email is required.'
			};

		if (!name.first && !name.last)
			return {
				success: false,
				message: 'A first and last name are required.'
			};

		if (!message)
			return {
				success: false,
				message: 'A message is required.'
			};

		const response = await sendEmail(fetch, {
			subject,
			sender: {
				name: `${name.first} ${name.last} via Contact Form`,
				email: 'contact@50statestravel.com'
			},
			to: [
				{
					name: 'Meela Mingua',
					email: 'meela.mingua@50statestravel.com'
				}
			],
			textContent: `${message}\n\nFrom: ${name.first} ${name.last} ${email}`
		});

		if (!response.success)
			return {
				success: false,
				message: `Failed to send email: ${response.error.message}`
			};

		const followUp = await sendEmail(fetch, {
			subject: 'Thank you for contacting 50 States Travel!',
			sender: {
				name: '50 States Travel',
				email: 'contact@50statestravel.com'
			},
			to: [
				{
					name: `${name.first} ${name.last}`,
					email
				}
			],
			params: {
				firstName: name.first!,
				lastName: name.last!
			},
			htmlContent: followUpHTMLContent
		});

		if (!followUp.success)
			return {
				success: false,
				message: `Failed to send email: ${followUp.error.message}`
			};

		return {
			success: true
		};
	}
} satisfies Actions;
