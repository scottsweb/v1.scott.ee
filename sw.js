importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
	"cacheId": "scott.ee",
	"clientsClaim": true,
	"directoryIndex": "/"
})

workboxSW.precache( [
	{
		"url": "/_nuxt/app.981bde2fc8dbefabb1a9.js",
		"revision": "a1d69d37612bc467fe1ee27c9c1a0221"
	},
	{
		"url": "/_nuxt/layouts/default.deaad687217fb950311a.js",
		"revision": "8c5c532f77beba362725d93a9bb49c04"
	},
	{
		"url": "/_nuxt/manifest.debc814c38559d8d693e.js",
		"revision": "0e28930400c7d8ca8f048fba621ff3c9"
	},
	{
		"url": "/_nuxt/pages/_slug.68ef571955b1048b4af5.js",
		"revision": "9ac617bf8fcfdf1ca38ea1f5e82024e8"
	},
	{
		"url": "/_nuxt/pages/index.d63b267364a060f0c199.js",
		"revision": "8b7fc9a55a8fba46cc008574e6ba9662"
	},
	{
		"url": "/_nuxt/pages/page/_slug.b9a86c3751f2e2c83b29.js",
		"revision": "39238d8051ef2f20e89108d5e3c87db9"
	},
	{
		"url": "/_nuxt/vendor.ce5519397641a6091cd7.js",
		"revision": "c4e330c37924d39e38e7356fad15aaaf"
	}
] )

workboxSW.router.registerRoute( new RegExp( '/_nuxt/.*' ), workboxSW.strategies.cacheFirst( {} ), 'GET' )
workboxSW.router.registerRoute( new RegExp( '/.*' ), workboxSW.strategies.networkFirst( {} ), 'GET' )
