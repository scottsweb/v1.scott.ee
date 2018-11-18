<template>
	<div class="app">
		<Header/>
		<main role="main" class="content small-container">
			<transition name="fade" appear>
				<nuxt/>
			</transition>
		</main>
		<Footer/>
		<!-- duetone svg -->
		<svg xmlns="http://www.w3.org/2000/svg" id="duetone-svg">
			<filter id="duotone">
				<feColorMatrix type="matrix" result="grayscale" values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0" ></feColorMatrix>
				<feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
					<feFuncR type="table" tableValues="0.164705882353 0"></feFuncR>
					<feFuncG type="table" tableValues="0.164705882353 0.737254901961"></feFuncG>
					<feFuncB type="table" tableValues="0.164705882353 0.83137254902"></feFuncB>
					<feFuncA type="table" tableValues="0 1"></feFuncA>
				</feComponentTransfer>
			</filter>
		</svg>
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
