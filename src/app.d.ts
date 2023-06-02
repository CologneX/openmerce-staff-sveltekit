// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}


declare interface StaffCredentials {
	username: string;
	fin_user: boolean;
	inv_user: boolean;
	sys_admin: boolean;
}

declare interface Product {
	category_id: number | null;
	name: string | null;
	description: string | null;
	price: number | null;
	weight: number | null;
	initial_stock: number | null;
	length: number | null;
	width: number | null;
	height: number | null;
}

declare interface Category {
	name: string;
	description: string;
	homepage_visibility: boolean;
}

declare interface ProductEdit {
	id: string | null;
	name: string | null;
	description: string | null;
	price: number | null;
	weight: number | null;
	category_name: string | null;
	cumulative_review: number | null;
	image_urls: string[] | FileList[] | null;
	dimension: string | null;
	stock: number | null;
}