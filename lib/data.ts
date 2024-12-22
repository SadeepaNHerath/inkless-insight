import { IBlogDetial } from "./types";

export const blogDeafultValue = `
## Serendipity Chronicles: Tales from Sri Lanka

As we wrap up our adventures in the beautiful island of Sri Lanka, let's reflect on the serendipitous moments that defined this journey. The JavaScript snippet below captures a moment of serendipity in code:

\`\`\`js @app/lib/serendipityMoments.js
const serendipityMoments = [
  "Unexpectedly meeting a fellow traveler at Galle Fort",
  "Discovering a hidden gem in the hills of Ella",
  "Finding the perfect cup of Ceylon tea when least expected"
];

const randomSerendipity = serendipityMoments[Math.floor(Math.random() * serendipityMoments.length)];
console.log(\`Serendipity at its finest: \${randomSerendipity}\`);
\`\`\`

`;

export const blogs = [
	{
		id: `1`,
		title: "Exploring the Wonders of Sri Lanka",
		image_url:
			"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		created_at: "2023-05-15",
		is_premium: true,
		is_published: true,
		content: blogDeafultValue,
	},
	{
		id: "2",
		title: "A Journey Through the Cultural Triangle",
		image_url:
			"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		created_at: "2023-06-22",
		is_premium: false,
		is_published: false,
		content: blogDeafultValue,
	},
	{
		id: "3",
		title: "Sunset at Mirissa Beach",
		image_url:
			"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3557&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		created_at: "2023-08-10",
		is_premium: false,
		is_published: false,
		content: blogDeafultValue,
	},
	{
		id: "4",
		title: "The Rich Flavors of Sri Lankan Cuisine",
		image_url:
			"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		created_at: "2023-10-05",
		is_premium: true,
		is_published: false,
		content: blogDeafultValue,
	},
	{
		id: "5",
		title: "Wildlife Adventures in Yala National Park",
		image_url:
			"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		created_at: "2023-10-05",
		is_premium: false,
		is_published: false,
		content: blogDeafultValue,
	},
];

export const defaultCreateBlog: IBlogDetial = {
	id: "",
	title: "",
	image_url: "",
	created_at: "",
	is_premium: false,
	is_published: false,
	blog_content : {
		created_at: "",
		content: "",
		blog_id: "",
	},
};

export const users = [
	{
		display_name: "Nimal Perera",
		profile_pic: "/profile.png",
		subscription_status: "Active",
		customer_id: "123456",
		email: "nimal.perera@example.com",
	},
	{
		display_name: "Kumari Silva",
		profile_pic: "/profile.png",
		subscription_status: "Inactive",
		customer_id: "789012",
		email: "kumari.silva@example.com",
	},
	{
		display_name: "Ravi Fernando",
		profile_pic: "/profile.png",
		subscription_status: "Active",
		customer_id: "345678",
		email: "ravi.fernando@example.com",
	},
	{
		display_name: "Anjali Wijesinghe",
		profile_pic: "/profile.png",
		subscription_status: "Active",
		customer_id: "901234",
		email: "anjali.wijesinghe@example.com",
	},
];