export default {
	// add one the pages state
	addPage(state, page) {
		// check the store for existing page before adding
		if (undefined === this.getters.getPageBySlug(page.slug)) {
			state.pages.push(page)
		}
	},
	// add one or many posts to the posts state
	addPosts(state, posts) {
		for (let post of posts) {
			// check the store for existing post before adding
			if (undefined === this.getters.getPostBySlug(post.slug)) {
				state.posts.push(post)
			}
		}
		// TODO: do we need to sort by date (the API does that) - better to do this on get not set
		//state.posts.sort((a,b) => a.date_gmt < b.date_gmt)
	},
	// paginate
	paginate(state, page) {
		state.pagination.pages.push(page)
	},
	// current page
	currentPage(state, page) {
		state.pagination.current = page
	},
	// pagination totals from API
	paginateTotals(state, totals) {
		state.pagination.totalPosts = totals.totalPosts
		state.pagination.totalPostsPages = totals.totalPostsPages
	},
	// enable / disable pagination
	paginateToggle(state, onoff) {
		state.pagination.paginate = onoff
	}
}
