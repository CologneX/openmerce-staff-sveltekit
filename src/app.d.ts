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
	category_id: number;
	name: string;
	description: string;
	price: number;
	weight: number;
	initial_stock: number;
	length: number;
	width: number;
	height: number;
}

declare interface Category {
	name: string;
	description: string;
	homepage_visibility: boolean;
}


