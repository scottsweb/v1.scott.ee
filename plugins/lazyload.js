import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use( VueLazyload, {
	preLoad: 1.0,
	throttleWait: 600,
	filter: {
		progressive( listener, options ) {
			const isCDN = /wp\.com/
			const regexTypeOne = /w=(\d)*/gm;
			// use a low res image for the loader
			if ( isCDN.test( listener.src ) ) {
				listener.el.setAttribute( 'lazy-progressive', 'true' )
				listener.loading = listener.src.replace( regexTypeOne, '' ) + '&w=90&strip=info'
			}
			// respect data save header and improve low bandwidth performance
			if ( 'connection' in navigator && isCDN.test( listener.src ) ) {
				if (
					navigator.connection.saveData === true ||
					navigator.connection.effectiveType === 'slow-2g' ||
					navigator.connection.effectiveType === '2g' ||
					navigator.connection.effectiveType === '3g'
				) {
					const regexSize = /\?(resize|w)=(\d*)/gmi;
					const dataSrc = listener.src
					const dataSrcset = listener.el.getAttribute( 'data-srcset' )

					const newDataSrc = dataSrc.replace( regexSize, ( match, $1, $2 ) => {
						return match.replace( 'resize', 'w' ).replace( $2, ( $2 / 4 ) * window.devicePixelRatio ) + '&strip=info&quality=50'
					} );

					const newDataSrcset = dataSrcset.replace( regexSize, ( match, $1, $2 ) => {
						return match.replace( $2, ( $2 / 4 ) * window.devicePixelRatio ) + '&strip=info&quality=50'
					} );

					listener.src = newDataSrc
					listener.el.setAttribute( 'data-srcset', newDataSrcset )
				}
			}
		}
	}
} )
