<template>
	<header class="site-header medium-container">
		<transition name="popin" appear>
			<div class="site-header-container" v-shortcuts="[
				{ shortcut: [ 'arrowright' ], callback: goNextPage, once: true },
				{ shortcut: [ 'arrowleft' ], callback: goPrevPage, once: true },
				{ shortcut: [ 'esc' ], callback: goBackUp, once: true },
				{ shortcut: [ 'h' ], callback: goHome, once: true },
			]">
				<nuxt-link to="/">
					<Logo/>
					<h1 class="title screen-reader-text" v-if="this.$route.path === '/'">Scott Evans</h1>
					<span class="title screen-reader-text" v-else>Scott Evans</span>
				</nuxt-link>

				<nav class="navigation">
					<transition name="fade" mode="out-in">
						<ul class="pagination pagination-archive" v-if="postArchive" key="archive">
							<li v-if="notFirstPage">
								<nuxt-link :to="prevPage">
									<span class="screen-reader-text">Older posts</span>
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="rightTitle">
										<title id="rightTitle">Right arrow icon</title>
										<path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
									</svg>
								</nuxt-link>
							</li>
							<li v-else>&nbsp;</li>
							<li v-if="notLastPage">
								<nuxt-link :to="nextPage">
									<span class="screen-reader-text">Newer posts</span>
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="leftTitle">
										<title id="leftTitle">Left arrow icon</title>
										<path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
									</svg>
								</nuxt-link>
							</li>
							<li v-else>&nbsp;</li>
						</ul>
						<ul class="pagination pagination-single" v-else key="single">
							<nuxt-link :to="backUp">
								<span class="screen-reader-text">{{ backUpText }}</span>
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="backTitle">
									<title id="backTitle">Menu icon</title>
									<path d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
								</svg>
							</nuxt-link>
						</ul>
					</transition>
				</nav>
			</div>
		</transition>
	</header>
</template>

<script>
import Logo from '~/components/logo.vue'

export default {
	components: {
		Logo
	},
	computed: {
		backUp() {
			if ( ! this.$store.state.pagination.current || this.$store.state.pagination.current === 1 ) {
				return '/'
			} else {
				return '/page/' + this.$store.state.pagination.current + '/'
			}
		},
		backUpText() {
			if ( ! this.$store.state.pagination.current || this.$store.state.pagination.current === 1 ) {
				return 'Back to home'
			} else {
				return 'Back to page ' + this.$store.state.pagination.current
			}
		},
		nextPage() {
			return '/page/' + ( this.$store.state.pagination.current + 1 ) + '/'
		},
		prevPage() {
			if ( ( this.$store.state.pagination.current - 1 ) === 1 ) {
				return '/'
			} else {
				return '/page/' + ( this.$store.state.pagination.current - 1 ) + '/'
			}
		},
		postArchive() {
			return this.$route.path === '/' || this.$route.name === 'page-id'
		},
		notFirstPage() {
			return this.$store.state.pagination.current && this.$store.state.pagination.current !== 1
		},
		notLastPage() {
			return this.$store.state.pagination.current < this.$store.state.pagination.totalPostsPages
		},
	},
	methods: {
		goNextPage() {
			if ( this.notLastPage && this.postArchive ) {
				this.$router.push( this.nextPage )
			}
		},
		goPrevPage() {
			if ( this.notFirstPage && this.postArchive ) {
				this.$router.push( this.prevPage )
			}
		},
		goBackUp() {
			this.$router.push( this.backUp )
		},
		goHome() {
			this.$router.push( '/' )
		}
	}
}
</script>
