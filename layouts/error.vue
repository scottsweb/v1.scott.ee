<template>
	<div class="__nuxt-error-page">
		<div class="error">
			<div class="title">{{ message }}</div>
			<p class="description" v-if="statusCode === 404">
				<nuxt-link class="error-link" to="/">Home</nuxt-link>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'nuxt-error',
	props: ['error'],
	head() {
		return {
			title: this.message,
			bodyAttrs: {
				class: 'error-page'
			},
		}
	},
	// Only on debug mode
	data() {
		return {
	  		mounted: false
		}
	},
	mounted() {
		this.mounted = true
	},
	created() {
		console.error( this.error )
	},
	watch: {
		error( newErr ) {
			if( newErr ) {
				console.error(newErr)
			}
		}
	},
	computed: {
		statusCode() {
			return ( this.error && this.error.statusCode ) || 500
		},
		message() {
			return this.error.message || '<%= messages.client_error %>'
		}
	}
}
</script>

<style>
.__nuxt-error-page {
  padding: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.__nuxt-error-page .error {
  max-width: 450px;
}
.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  margin-bottom: 8px;
}
.__nuxt-error-page .description {
  line-height: 21px;
  margin-bottom: 10px;
}
</style>
