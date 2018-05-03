import Vue from 'vue'
const format = require( 'date-fns/format' )

Vue.mixin( {
	methods: {
		/**
		 * Returns date formatted like 'May 16, 2018'
		 * @param {String} date
		 * @return {String} formatted date
		 */
		longTimestamp( date ) {
			return format( date, 'MMMM Do, YYYY' )
		}
	}
} )
