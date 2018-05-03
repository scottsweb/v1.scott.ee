<template>
	<section class="posts">
		<header>
			<h2 class="post-title" v-show="this.$route.path === '/'">Design, Technology, Open Source &amp; Sustainability.</h2>
		</header>
		<transition-group
			name="list"
			tag="ul"
			v-if="posts && posts.length"
			class="posts"
			v-bind:css="false"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:leave="leave"
			appear
		>
			<li v-for="(post, index) in posts" v-bind:key="post.id" v-bind:data-index="index" class="post">
				<nuxt-link :to="'/journal/' + post.slug + '/'">
					<span>{{ longTimestamp( post.date ) }}</span>
					<h3 v-html="post.title.rendered"></h3>
				</nuxt-link>
			</li>
		</transition-group>
	</section>
</template>

<script>
export default {
	components: {
	},
	mixins: {
		longTimestamp: Function
	},
	async asyncData({ payload, isStatic, store, params }) {
		// payload set during static generation
		if ( payload && isStatic ) {
			// TODO: this can probably all go? as we can use the JSON trick?
			// setup the store as it would be in SPA mode
			//const page = parseInt( params.id ) || 1
			const page = payload.meta.page
			store.commit( 'currentPage', page )
			store.commit( 'paginate', page )
			store.commit( 'paginateTotals', {
				totalPosts: payload.meta.totalPosts,
				totalPostsPages: payload.meta.totalPostsPages
			} )
			store.commit( 'addPosts', payload.payload )
		} else {
			await store.dispatch( 'getPosts', { page: parseInt( params.id || 1 ) } )
		}
	},
	fetch ({ params, redirect, route }) {
		// redirect page 1 or /page/
		if ( 1 === parseInt( params.id ) || '/page' === route.path.replace(/\/$/, '') ) {
			redirect( 301, '/' )
		}
	},
	mounted() {
		// prefetch pages either side of this one
		const nextPage =  parseInt( this.$route.params.id ) + 1 || 2;
		this.$store.dispatch( 'getPosts', { page: nextPage, prefetch: true } );

		const previousPage = ( this.$route.params.id ) ? parseInt( this.$route.params.id - 1 ) : false;
		if ( previousPage ) {
			this.$store.dispatch( 'getPosts', { page: previousPage, prefetch: true } );
		}
	},
	head() {
		return {
			title: 'Journal • Page ' + ( this.$route.params.id || 1 ),
			meta: [
				{
					hid: 'og:title',
					property: 'og:title',
					content: 'Journal • Page ' + ( this.$route.params.id || 1 ) + ' • Scott Evans'
				}
			]
		}
	},
	computed: {
		posts() {
	 		return this.$store.getters.getPostsPage( parseInt( this.$route.params.id ) || 1 )
		}
	},
	methods: {
		beforeEnter: function (el) {
			el.style.opacity = 0
		},
		enter: function (el, done) {
			var delay = el.dataset.index * 150
			setTimeout(() => {
				this.$velocity(
					el,
					{ opacity: 1 },
					{ complete: done }
				)
			}, delay)
		},
		leave: function (el, done) {
			var delay = el.dataset.index * 150
			setTimeout(() => {
				this.$velocity(
					el,
					{ opacity: 0 },
					{ complete: done }
				)
			}, delay)
		}
	},
}
</script>
