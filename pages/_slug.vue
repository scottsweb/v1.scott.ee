<template>
	<section class="container">
		<div>
			<h1 v-html="post.title.rendered" class="post-title"></h1>
			<div v-html="post.content.rendered"></div>
		</div>
	</section>
</template>

<script>
export default {
	components: {
	},
	async asyncData({ payload, isStatic, store, params }) {
		// payload set during static generation
		if ( payload && isStatic ) {
			store.commit( 'addPage', payload )
		} else {
			await store.dispatch( 'getPage', params )
		}
	},
	computed: {
		post() {
			return this.$store.getters.getPageBySlug( this.$route.params.slug )
		}
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

<style>

</style>
