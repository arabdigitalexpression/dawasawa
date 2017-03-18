<template>
  	<div>
  		<router-view></router-view>
  	</div>
</template>

<script>
const config = require('./config.json')

// notifications
import connectionError from './notifications/connection_error.json'

export default {
	data() {
		return {
			connectionError
		}
	},
	methods: {
		requestSessionId() {
			let url = config.server_url + '/api'

			this.$http.get(url, { "credentials": true }).then(response=> {
				// connected to the API and received a session id
			}, response => {
				// error
				UIkit.notification({
				    message: connectionError.message,
				    status: 'warning',
				    pos: 'top-center',
				    timeout: 10000
				});
			})
		}
	},
	mounted() {
		this.requestSessionId()
	}
}
</script>

<style>
	/* General styles*/
	html, body {
		margin: 0;
		padding: 0;
		font-family: 'Cairo', sans-serif; 
	}

	h1,h2,h3,h4,h5,h6,p,a,input {
		font-family: 'Cairo', sans-serif !important;
	}
	.uk-button-primary {
		background-color: #e84c3d;
	}
	.uk-button-primary:hover {
		background-color: #d42720;
	}
	a {
		color: #e84c3d;
	}
	a:hover {
		color: #d42720;
	}

	.page-name-border {
		height: 2px;
		background-color: #333;
		margin-top: -10px;
	}
</style>
