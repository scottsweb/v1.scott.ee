export default {
	// get a page by slug
	getPageBySlug: (state) => (slug) => {
		return state.pages.filter(page => page.slug === slug)[0]
	},
	// get a page by id
	getPageById: (state) => (id) => {
		return state.pages.filter(page => page.id === id)[0]
	},
	// get a post by slug
	getPostBySlug: (state) => (slug) => {
		return state.posts.filter(post => post.slug === slug)[0]
	},
	// get a post by id
	getPostById: (state) => (id) => {
		return state.posts.filter(post => post.id === id)[0]
	},
	// get all posts
	getPosts: (state) => {
		// sort by date
		const posts = [...state.posts].sort( (a,b) => {
			return a.date < b.date
		} )
		return posts
	},
	// get page of posts
	getPostsPage: (state) => (page) => {
		// filter just the current page
		const posts = state.posts.filter(post => post.page === page)
		// sort by date
		return posts.sort( (a,b) => {
			return a.date < b.date
		} )
	},
}
