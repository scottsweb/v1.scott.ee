import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use( VueLazyload, {
	preLoad: 1.0,
	throttleWait: 600,
	filter: {
		progressive (listener, options) {
			const isCDN = /wp\.com/
			const regexTypeOne = /w=(\d)*/gm;
			if ( isCDN.test( listener.src ) ) {
				listener.el.setAttribute( 'lazy-progressive', 'true' )
				listener.loading = listener.src.replace( regexTypeOne, '' ) + '&w=90'
			}
		}
	}
} )
