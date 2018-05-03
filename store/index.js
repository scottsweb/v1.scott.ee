import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default () => {
	return new Vuex.Store( {
		strict: true,
		state: {
			pagination: {
				current: false,
				totalPosts: 0,
				pages: [],
				totalPostsPages: 0,
				postsPerPage: 10,
				paginate: true
			},
			posts: [],
			pages: [],
		},
		actions,
		mutations,
		getters
	} )
}
