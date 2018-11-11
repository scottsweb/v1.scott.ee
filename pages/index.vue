<template>
	<section class="posts">
		<header>
			<h2 class="section-title" v-show="this.$route.path === '/'" v-html="widont( 'Design, Technology, Open Source &amp; Sustainability.' )"></h2>
		</header>
		<transition-group
			name="list"
			tag="div"
			v-show="posts && posts.length"
			v-bind:css="false"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:leave="leave"
			appear
		>
			<article v-for="(post, index) in posts" v-bind:key="post.id" v-bind:data-index="index" class="post hentry">
				<header class="entry-header">
					<nuxt-link :to="'/journal/' + post.slug + '/'">
						<time class="entry-date published" datetime="post.date">{{ longTimestamp( post.date ) }}</time>
						<h3 v-html="widont( post.title.rendered )" class="entry-title"></h3>
					</nuxt-link>
				</header>
			</article>
		</transition-group>
	</section>
</template>

<script>
export default {
	components: {
	},
	mixins: {
		longTimestamp: Function,
		widont: Function,
	},
	async asyncData({ payload, isStatic, store, params }) {
		// payload set during static generation
		if ( payload && isStatic ) {
			// setup the store as it would be in SPA mode
			// const page = parseInt( params.id ) || 1
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
		const nextPage = parseInt( this.$route.params.id ) + 1 || 2;
		this.$store.dispatch( 'getPosts', { page: nextPage, prefetch: true } );

		const previousPage = ( this.$route.params.id ) ? parseInt( this.$route.params.id - 1 ) : false;
		if ( previousPage ) {
			this.$store.dispatch( 'getPosts', { page: previousPage, prefetch: true } );
		}
	},
	head() {
		return {
			title: 'Journal • Page ' + ( this.$route.params.id || 1 ),
			bodyAttrs: {
				class: this.$route.params.id ? 'archive page page-' + this.$route.params.id : 'home archive'
			},
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
		beforeEnter: function( el ) {
			el.style.opacity = 0
		},
		enter: function( el, done ) {
			var delay = el.dataset.index * 150
			setTimeout( () => {
				this.$velocity(
					el,
					{ opacity: 1 },
					{ complete: done }
				)
			}, delay )
		},
		leave: function( el, done ) {
			var delay = el.dataset.index * 150
			setTimeout( () => {
				this.$velocity(
					el,
					{ opacity: 0 },
					{ complete: done }
				)
			}, delay )
		}
	},
}
</script>
