<template>
	<!-- TODO: Add about panel / overlay (possibly served from API) -->
	<!-- TODO: Add page render time -->
	<div>
		<ul class="" style="display:none;">
			<li><a href="https://profiles.wordpress.org/scottsweb">WP</a></li>
			<li><a href="https://twitter.com/scottsweb">Twitter</a></li>
			<li><a href="https://github.com/scottsweb">GitHub</a></li>
			<li><a href="https://scott.ee/feed/">RSS</a></li>
			<li><!--Inital load in {{ generated }} seconds--></li>
		</ul>
		<no-ssr>
			<v-offline onlineClass="notification notification-online" offlineClass="notification notification-offline">
				<div slot="offline">
					<span>Offline.</span>
				</div>
			</v-offline>
		</no-ssr>
	</div>
</template>

<script>
import vOffline from '~/components/v-offline.vue'

export default {
	components: {
		vOffline
	},
	computed: {
		generated() {
			const t = window.performance && performance.timing;
			if ( ! t ) {
				return;
			}
			return ( t.loadEventEnd - t.navigationStart) / 1000;
		}
	}
}
</script>
