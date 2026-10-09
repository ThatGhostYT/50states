import { BREVO_API_KEY } from '$env/static/private';

const BASE_URL = 'https://api.brevo.com/v3';

export interface SendEmailAPIOptions {
	subject: string;
	sender: {
		name: string;
		email: string;
	};
	to: {
		name: string;
		email: string;
	}[];
	params?: Record<string, string>;
	htmlContent?: string;
	textContent?: string;
}

export interface SendEmailSuccess {
	success: true;
	messageId: string;
}

export interface SendEmailFailure {
	success: false;
	error: {
		code: number;
		message: string;
	};
}

export type SendEmailResult = SendEmailSuccess | SendEmailFailure;

export async function sendEmail(
	fetch: typeof globalThis.fetch,
	options: SendEmailAPIOptions
): Promise<SendEmailResult> {
	if (!options.htmlContent && !options.textContent) {
		throw new Error('Either htmlContent or textContent must be provided.');
	}

	try {
		const response = await fetch(`${BASE_URL}/smtp/email`, {
			method: 'POST',
			headers: {
				'api-key': BREVO_API_KEY,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(options)
		}).then((res) => {
			console.log(res, options.to);
			return res;
		});

		if (response.ok)
			return {
				success: true,
				messageId: (await response.json()).messageId
			};
		else {
			console.error(await response.text());

			return {
				success: false,
				error: {
					code: response.status,
					message: response.statusText
				}
			};
		}
	} catch (e) {
		return {
			success: false,
			error: {
				code: 0,
				message: e instanceof Error ? e.message : String(e)
			}
		};
	}
}

export { default as followUpHTMLContent } from './FollowUp.html?raw';
