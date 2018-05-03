export default function( { $axios, redirect, isDev, isStatic } ) {
	$axios.onRequest( config => {
		// TODO: ideally this will not run in SPA mode (better check than dev)
		if ( process.browser && ! isDev ) {
			config.baseURL = '/json/'
			if ( config.params.slug ) {
				config.url = config.params.slug + '.json'
			} else if ( config.params.page ){
				config.url = 'page-' + config.params.page + '.json'
			}
			config.params = {}
			// TODO check for file first before making query?
			// otherwise failed requests when API could pick up slack ?
			// might not be worth it
		}
		console.log( 'Making request to ' + config.url )
	} )
	$axios.onResponse( response => {
		// TODO: ideally this will not run in SPA mode (better check than dev)
		// The faked / local API from generate has a slightly different data layout
		if ( process.browser && ! isDev ) {
			if ( response.data.meta !== undefined ) {
				response.headers['x-wp-total'] = response.data.meta.totalPosts
				response.headers['x-wp-totalpages'] = response.data.meta.totalPostsPages
				response.data = response.data.payload
			}
		}
	} )
	// TODO: Handle errors better, only log requests in debug mode?
	$axios.onError( error => {
		const code = parseInt( error.response && error.response.status )
		if ( code === 400 ) {
			redirect( '/400' )
		}
	} )
}
