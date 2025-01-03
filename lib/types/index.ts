export type IBlog = {
	id: string;
	title: string;
	image_url: string;
	created_at: string;
	is_premium: boolean;
	content: string;
	is_published: boolean;
};

export type IBlogDetial = {
	created_at: string;
	id: string;
	image_url: string;
	is_premium: boolean;
	is_published: boolean;
	title: string;
	blog_content: {
		id: string;
		content: string;
		created_at: string;
	};
} | null;

export type IBlogForm = {
	created_at: string;
	id: string;
	image_url: string;
	is_premium: boolean;
	is_published: boolean;
	title: string;
	blog_content: {
		id: string;
		content: string;
		created_at: string;
	};
};

export type Iuser = {
	id: string;
	created_at: string;
	email: string;
	profile_pic: string;
	display_name: string;
	role: string;
	is_subscribed: boolean;
	stripe_subscriptoin_id: string | null;
	stripe_customer_id: string | null;
} | null;