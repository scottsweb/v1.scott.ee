export default ( { isDev, req, redirect } ) => {
	// force https
	if ( ! isDev && req ) {
		const protocol = req.headers['x-forwarded-proto'] || ( req.connection.encrypted ? 'https' : 'http' )
		if ( protocol === 'http' ) {
			return redirect( 301, `https://${req.headers.host}${req.url}` )
		}
	}
}
