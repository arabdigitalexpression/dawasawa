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
				UIkit.modal.dialog('<p class="alert-text">' + connectionError.message + '</p>')
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

	h1,h2,h3,h4,h5,h6,p,a,input, button {
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

	.uk-modal-dialog p {
		color: red;
		text-align: center;
		padding: 10px;
		font-size: 1.5rem;
	}
	@media screen and (max-width: 640px) {
		.uk-modal-dialog p {
			font-size: 1rem;
		}
	}
</style>
