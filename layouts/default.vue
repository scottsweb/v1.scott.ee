<template>
	<div class="app">
		<Header/>
			<main role="main" class="content small-container">
				<transition name="fade" appear>
					<nuxt/>
				</transition>
			</main>
		<Footer/>
	</div>
</template>

<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'

export default {
	components: {
		Header,
		Footer
	}
}
</script>

<style lang="scss">

</style>
