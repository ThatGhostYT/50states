import type { Snippet } from 'svelte';

export interface Image {
	src: string;
	alt?: string;
}

export interface CarouselComponentProps {
	imgs: Image[];
	hideDots?: boolean;
	timer?: boolean;
}

export interface CardEmailButton {
	label: string;
	subject: string;
	message: string;
	redirect?: string;
}

export interface CardComponentProps {
	children?: Snippet;

	title: string;
	img?: Image;
	horizontal?: boolean;
	button?: false | CardEmailButton;

	// Bindables
	subject?: string;
	message?: string;
}

// export type CardComponentDeclaration = {
//     [P in keyof Omit<CardComponentProps, "children" | "horizontal" | "subject" | "message" | "button">]-?: CardComponentProps[P];
// };

export interface CardComponentDeclaration extends Required<
	Omit<CardComponentProps, 'children' | 'horizontal' | 'img' | 'subject' | 'message' | 'button'>
> {
	img?: Image;
	children?: string;
	horizontal?: boolean;
}
