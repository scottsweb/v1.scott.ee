<template>
	<!-- TODO: Add about panel / overlay (possibly served from API) -->
	<!-- TODO: Add page render time -->
	<div class="footer" role="contentinfo">
		<ul class="" style="display:none;">
			<li><a href="https://profiles.wordpress.org/scottsweb">WP</a></li>
			<li><a href="https://twitter.com/scottsweb">Twitter</a></li>
			<li><a href="https://github.com/scottsweb">GitHub</a></li>
			<li><a href="https://scott.ee/feed/">RSS</a></li>
			<li><!--Inital load in {{ generated }} seconds--></li>
		</ul>
		<a class="dat-link tooltip" href="dat://scott.ee/" data-tooltip="P2P/Dat Version">
			<span class="screen-reader-text">A P2P/Dat version of this website is also available</span>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 240 240">
				<path d="M120 240a9 9 0 0 1-4.5-1.21l-96-55.5a9 9 0 0 1-4.5-7.79v-111a9 9 0 0 1 4.5-7.79l96-55.5a9 9 0 0 1 9 0l96 55.5a9 9 0 0 1 4.5 7.79v111a9 9 0 0 1-4.5 7.79l-96 55.5A9 9 0 0 1 120 240zm-87-69.69l87 50.3 87-50.3V69.69L120 19.4 33 69.69z"/><path d="M120.43 166.34a70.72 70.72 0 0 1-50.33-20.86 9 9 0 0 1 12.73-12.73 53.14 53.14 0 0 0 75.2 0 9 9 0 0 1 12.73 12.73 70.72 70.72 0 0 1-50.33 20.86zm-47-58.73a9 9 0 0 1-9-9V81.39a9 9 0 0 1 18 0v17.22a9 9 0 0 1-9 9zm94 0a9 9 0 0 1-9-9V81.39a9 9 0 0 1 18 0v17.22a9 9 0 0 1-9 9z"/>
			</svg>
		</a>
		<no-ssr>
			<v-offline onlineClass="notification notification-online" offlineClass="notification notification-offline">
				<div slot="offline">
					<span>Offline</span>
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
