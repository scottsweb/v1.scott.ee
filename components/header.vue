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
									prev
								</nuxt-link>
							</li>
							<li v-else>&nbsp;</li>
							<li v-if="notLastPage">
								<nuxt-link :to="nextPage">
									next
								</nuxt-link>
							</li>
							<li v-else>&nbsp;</li>
						</ul>
						<ul class="pagination pagination-single" v-else key="single">
							<nuxt-link :to="backUp">
								<p>take me back</p>
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
	watch: {
		page: 'pageChanged'
	},
	computed: {
		backUp() {
			if ( ! this.$store.state.pagination.current || this.$store.state.pagination.current === 1 ) {
				return '/'
			} else {
				return '/page/' + this.$store.state.pagination.current + '/'
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
			if ( this.notLastPage ) {
				this.$router.push( this.nextPage )
			}
		},
		goPrevPage() {
			if ( this.notFirstPage ) {
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
