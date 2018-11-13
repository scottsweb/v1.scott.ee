import Cache from 'node-persist'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'
import path from 'path'

const cache = Cache.create( { dir: '/tmp/', ttl: 300000 } )
const debug = require( 'debug' )( 'nuxt:generate' )
const sleep = require( 'util' ).promisify( setTimeout )

module.exports = {
	/*
	* Headers of the page
	*/
	head: {
		title: '٩(͡๏̯͡๏)۶',
		titleTemplate: '%s • Scott Evans',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Design, Technology, Open Source & Sustainability.' },
			{ hid: 'og:title', property: 'og:title', content: 'Scott Evans' },
			{ hid: 'og:description', property: 'og:description', content: 'Design, Technology, Open Source & Sustainability.' },
			{ hid: 'og:image', property: 'og:image', content: '/og-card.png' },
			{ property: 'twitter:card', content: 'summary_large_image' },
			{ property: 'twitter:site', content: '@scottsweb' },
			{ property: 'twitter:creator', content: '@scottsweb' },
		],
		link: [
			{ rel: 'dns-prefetch', href: '//i0.wp.com' },
			{ rel: 'dns-prefetch', href: '//i1.wp.com' },
			{ rel: 'dns-prefetch', href: '//i2.wp.com' },
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'alternate',  type: 'application/rss+xml', title: 'RSS Feed | Scott Evans', href: 'https://api.scott.ee/feed/' }
		]
  	},
	/*
	* CSS
	*/
	css: [
		'@/assets/css/main.scss'
	],
	/*
	** Customize the progress bar color and indicator
	*/
	loading: { color: '#00bcd4' },
	loadingIndicator: {
		name: 'rotating-plane',
		color: '#444444',
		background: 'white'
	},
	/*
	* Axios / API
	*/
	axios: {
		baseURL: 'https://api.scott.ee/wp-json/wp/v2/',
		https: true,
		progress: true
	},
	/*
	* WordPress settings
	*/
	wordpress: {
		postTypes: ['posts', 'pages'],
		postsPerPage: 10
	},
	/*
	* Build configuration
	*/
	build: {
		/*
		* Run ESLint on save
		*/
		extend ( config, { isDev, isClient } ) {
			if ( isDev && isClient ) {
				config.module.rules.push( {
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				} )
			}
			if ( ! isDev ) {
				// Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
				// for more information about purgecss.
				config.plugins.push(
					new PurgecssPlugin( {
						paths: glob.sync( [
							path.join(__dirname, './pages/**/*.vue'),
							path.join(__dirname, './layouts/**/*.vue'),
							path.join(__dirname, './components/**/*.vue')
						] ),
						whitelist: ['html', 'body'],
						whitelistPatterns: [
							/-enter-active$/,
							/-leave-active$/,
							/-enter$/,
							/-leave-to$/,
							/lazy$/,
							/wp-caption-text$/
						]
					} )
				)
			}
		},
		extractCSS: true,
		html: {
			minify: {
				collapseBooleanAttributes: true,
				decodeEntities: true,
				minifyCSS: true,
				minifyJS: true,
				processConditionalComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				trimCustomFragments: true,
				useShortDoctype: true
			},
		},
	},
	/*
	* Render configuration (for SSR)
	*/
	render: {
		compressor: {
			threshold: 9
		},
		static: {
			// https://www.npmjs.com/package/serve-static
			maxAge: 1000 * 60 * 60 * 24
		},
	},
	/*
	* Generate configuration
	*/
	generate: {
		dir: 'dist',
		interval: 0,
		fallback: true,
		apiCacheDir: 'static/json/',
		async routes() {
			debug( 'Generating application routes' )
			const apiRoutes = await cache.getItem( 'routes' )
			return apiRoutes
		}
	},
	/*
	* Plugins
	*/
	plugins: [
		{ src: '~plugins/lazyload', ssr: false },
		// { src: '~plugins/vue-scrollto', ssr: false },
		{ src: '~/plugins/velocity', ssr: false },
		{ src: '~/plugins/axios' },
		{ src: '~/plugins/keyboard', ssr: false },
		{ src: '~/plugins/mixins' },
	],
	/*
	* Middleware
	*/
	router: {
		middleware: ['https'],
		scrollBehavior: function( to, from, savedPosition ) {
			return { x: 0, y: 0 }
		}
	},
	/*
	* Modules
	*/
	modules: [
		['@nuxtjs/pwa', {
		  onesignal: false,
		  workbox: false, // no service worker during dev
		} ],
		'@nuxtjs/sitemap',
		'@nuxtjs/axios',
		'@nuxtjs/webpackmonitor',
		'@/modules/generate',
	],
	/*
	* PWA Manifest
	*/
	manifest: {
		name: 'Scott Evans',
		description: 'Design, Technology, Open Source & Sustainability.',
		lang: 'en-gb',
		dir: 'ltr',
		background_color: '#fff',
		theme_color: '#444444',
		display: 'standalone',
		orientation: 'portrait-primary',
		//start_url: 'index.html',
	},
	/*
	* Sitemap
	*/
	sitemap: {
		path: '/sitemap.xml',
		hostname: 'https://scott.ee',
		cacheTime: 1000 * 60 * 15,
		generate: true, // gets created as part of generate
		gzip: true,
		async routes() {
			// hack to allow api time to be cached
			// https://github.com/nuxt-community/sitemap-module/issues/27
			await sleep( 10000 )
			debug( 'Generating sitemap routes' )
			const apiRoutes = await cache.getItem( 'routes' )
			const sitemapRoutes = apiRoutes.map( ( route ) => {
				if ( route.route === '/' ) {
					return {
						url: route.route,
						changefreq: 'daily',
						priority: 1,
						lastmodISO: new Date().toISOString()
					}
				} else if ( route.route.includes( '/page/' ) ) {
					return {
						url: route.route,
						changefreq: 'daily',
						priority: 0.5,
						lastmodISO: new Date().toISOString()
					}
				} else {
					return {
						url: route.route,
						changefreq: 'monthly',
						priority: 0.8,
						lastmodISO: route.payload.modified
					}
				}
			} )
			return sitemapRoutes
		}
	},
	/*
	* Webpack Monitor
	*/
	webpackMonitor: {
		//launch: true
	}
}
