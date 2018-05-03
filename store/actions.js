export default {
	// page
	async getPage( { commit, state }, params ) {
		// check store for page already, bail if found
		if ( ! this.getters.getPageBySlug( params.slug ) ) {
			const page = await this.$axios.$get( 'pages?_embed', { params: {
				slug: params.slug
			} } )
			commit( 'addPage', page[0] )
		}
	},

	// post
	async getPost( { commit, state }, params ) {
		// check store for post already, bail if found
		if ( ! this.getters.getPostBySlug( params.slug ) ) {
			const post = await this.$axios.$get( 'posts?_embed', { params: {
				slug: params.slug
			} } )
			commit( 'addPosts', post )
		}
	},

	// posts TODO: turn this page/prefecth into an object
	async getPosts({ commit, state }, params ) {
		const { page } = params;
		const { prefetch } = params;

		// which page are we on?
		if ( ! prefetch ) {
			commit('currentPage', page)
		}
		// check before requesting more pages
		if (
			// we have no posts, get some
			0 === state.pagination.pages.length ||
			// we have requested a new page and not hit total pages
			( page && ( ! state.pagination.pages.includes( page ) ) && ( page <= state.pagination.totalPostsPages ) ) ||
			// we are prefetching and the prefetched page does not yet exist
			( prefetch && page && ( ! state.pagination.pages.includes( page ) ) && ( page <= state.pagination.totalPostsPages ) )
			// TODO: some time has passed, lets check again? - store time in object against page? or post
			// we don't want to be invalidating all stored data all the time?
			// perhaps it is better to just empty the store from time to time?
		) {
			// paginate - add this to our object of seen pages
			commit( 'paginate', page )
			// request posts from API
			const posts = await this.$axios.get( 'posts?_embed', { params: {
				'per_page': state.pagination.postsPerPage,
				'page': page
			} } )
			// update pagination totals in store from API response
			commit( 'paginateTotals', {
				totalPosts: parseInt(posts.headers['x-wp-total']),
				totalPostsPages: parseInt(posts.headers['x-wp-totalpages'])
			} )
			// add page to returned data so we can grab posts by page later
			posts.data.forEach( post => {
				post.page = page
			} )
			// add posts to store
			commit( 'addPosts', posts.data )
			// TODO: if a new post comes into the store after a timed update,
			// we need to re-index all pages as the new post may be on an unknown page
			// we don't want some pages with totalposts + 1 for example
		}
	}
}
