<template>
	<section class="post">
		<div>
			<span>{{ longTimestamp( post.date ) }}</span>
			<h1 v-html="post.title.rendered" class="post-title"></h1>
			<div v-lazy-container="{ selector: 'img' }">
				<div v-html="post.content.rendered"></div>
			</div>
		</div>
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
			store.commit('addPosts', [ payload ])
		} else {
			await store.dispatch('getPost', params);
		}
	},
	computed: {
		post() {
			return this.$store.getters.getPostBySlug(this.$route.params.slug)
		},
	},
	methods: {
		featuredImage() {
			let featuredImage = this.post._embedded['wp:featuredmedia']
			if ( featuredImage && featuredImage[0].media_details ) {
				return featuredImage[0].media_details.sizes.large.source_url ||
				featuredImage[0].media_details.sizes.full.source_url
			} else {
				return false // TODO: default image
			}
		},
	},
	head() {
		return {
			title: this.post.title.rendered,
			bodyAttrs: {
				class: 'single post post-id-' + this.post.id
			},
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.post.excerpt.rendered,
				},
				{
					hid: 'og:title',
					property: 'og:title',
					content: this.post.title.rendered + ' • Scott Evans'
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: this.post.excerpt.rendered
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: this.featuredImage()
				},
			]
		}
	},
}
</script>
