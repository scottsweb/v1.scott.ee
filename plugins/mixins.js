import Vue from 'vue'
const format = require( 'date-fns/format' )

Vue.mixin( {
	methods: {
		/**
		 * Returns date formatted like 'May 16, 2018'
		 * @param {string} date
		 * @return {string} formatted date
		 */
		longTimestamp( date ) {
			return format( date, 'MMMM Do, YYYY' )
		},
		/**
		 * No widows
		 * @param  {string} string
		 * @return {string}
		 */
		widont( string ) {
			return string.replace( / ([^ ]*)$/, '&nbsp;$1' )
		}
	}
} )
