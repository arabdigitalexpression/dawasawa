<template>
	<div class="home-wrapper">
		<nav uk-navbar>
			<div class="uk-navbar-right">
				<ds-link-button :name="navigation.request_entries.name" :route="navigation.request_entries.route"></ds-link-button>
			</div>
			<div class="uk-navbar-center">
				<router-link to="/" class="logo-container">
					<img class="header-logo" src="../../static/logo/dawasawa_logo@0,2x.png">
				</router-link>
			</div>
			<div class="uk-navbar-left">
				<ul class="uk-iconnav icons-list">
				    <li><!-- <router-link :to="navigation.emailus.route" uk-icon="icon: mail; ratio: 1.5"></router-link> -->
				    	<router-link :to="navigation.emailus.route"> {{navigation.emailus.name}} </router-link>
				    </li>
				    <li style="margin-right: 10px;"><!-- <router-link :to="navigation.about.route" class="y-flip" uk-icon="icon: question; ratio: 1.3"></router-link> -->
				    	<router-link :to="navigation.about.route"> {{navigation.about.name}} </router-link>
				    </li>
				</ul>
			</div>
		</nav>

		<div class="hero">
			<h1>خدمة تعاونية لتسهيل إيجاد الأدوية غير المتوافرة بطريق توصيل من لديهم فائض من أدوية يحبّون التبرّع بها و من هم يحتاجون تلك الأدوية</h1>
			<p>هذه الخدمة مجّانية لا يُدفع مقابل عيني و لا مادّي لاستخدامها</p>
		</div>

		<div class="search-area">
			<p class="encouraging-text">ابحث عن دواء</p>
			<span v-if="validationErrors.latinName.error" class="form-error"> {{ searchError }} </span>
			<form v-on:submit.prevent="submitSearch" id="search-form">
				<input v-model="searchKey" class="uk-input" type="text" placeholder="البحث بالأحرف اللاتينية فقط" list="matchlist">
			 	<datalist id="matchlist">
			 		<option v-for="key in keywords" :value="key"></option>
			 	</datalist>
				<p class="hint">
					نقلا عن العبوة أو الوصفة مع مراعاة 	الدقة، مثال: Augmentine
				</p>
				<button class="uk-button-primary search-button">ابحث</button>
			</form>
		</div>

		<div class="donation-aria">
			<p class="encouraging-text">أو يمكنك التبرع بالدواء الفائض عن حاجتك من هنا</p>
			<router-link class="main-button" :to="navigation.submit.route"> {{navigation.submit.name}} </router-link>
		</div>
	</div>
</template>

<script>
	import LinkButton from '../components/link_button.vue'
	import validator from 'validator'

	const navigation = require('../data/navigation.json')
	const config = require('../config.json')

	let validationErrors = require('../data/validation_errors.json')

	export default {
		data() {
			return {
				navigation,

				validationErrors, 

				keywords: [],

				searchKey: "", // search keyword

				searchError: "" // search error message
			}
		},
		components: {
			'ds-link-button': LinkButton
		},
		methods: {
			validateLatinName() {
				let result = validator.isAscii(this.searchKey)

				if (result === false && this.searchKey != "") {
					// latin name is written with non latin letters
					this.validationErrors.latinName.error = true
					this.searchError = this.validationErrors.latinName.msg
					$('#search-form > input').addClass('uk-form-danger')
				} else {
					// latin name is valid
					this.validationErrors.latinName.error = false
					this.searchError = ""
					$('#search-form > input').removeClass('uk-form-danger')
				}
			},
			submitSearch() {
				this.validateLatinName()

				if(this.validationErrors.latinName.error === false) {
					if(this.searchKey != "") {
						// submit search
						this.$router.push({ path: 'search', query: { name: this.searchKey } })
					}
				}
			}
		},
		watch: {
			searchKey: function() {
				let url = 'http://localhost/api/suggest/'
				if(this.searchKey.length > 2) {
					url = url + this.searchKey
					this.$http.get(url, { "credentials": true }).then(response=> {
						this.keywords = response.data
					}, response => {
						this.keywords = []
					})
				} else {
					this.keywords = []
				}
			}
		}
	}
</script>

<style>
	.home-wrapper {
		height: 100vh;
		min-height: 480px;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.home-wrapper nav{
		margin-top: 30px;
	}
	.logo-container {
		padding: 10px 0;
	}
	.header-logo {
		width: 200px;
	}
	.icons-list a {
		color: #e84c3d;
		transition: all 0.3s linear;
	}
	.icons-list a:hover {
		color: #d42720;
	}

	.y-flip {
		-webkit-transform: rotateY(180deg); /* Safari */
    	transform: rotateY(180deg);
	}

	.hero {
		padding: 30px 20px;
		text-align: center;
		max-width: 1200px;
		margin: 0 auto;
	}
	.hero h1 {
		font-size: 1.6rem;
		line-height: 2;
	}

	.hero p {
		color: #AbAbAb;
	}
	.search-area {
		width: 100%;
	}
	.search-area {
		max-width: 960px;
		min-width: 300px;
		margin: 0 auto;
		margin-top: -100px;
	}
	.search-area .hint {
		margin-top: 5px;
		color: rgba(0,0,0,0.53);
		font-size: 0.8rem;
		margin-bottom: 0;
	}
	.encouraging-text {
		color: #e84c3d;
		font-size: 1.2rem;
		margin-bottom: 5px;
	}

	.donation-aria {
		text-align: center;
		width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 60px;
		margin-bottom: 80px;
	}

	.donation-aria p {
		margin-left: 20px;
		margin-top: 10px;
	}

	.main-button {
		padding: 15px 30px 15px 30px;
		margin: 0;
		text-align: center;
		font-size: 1.2rem;
		background-color: #e84c3d;
		color: #FFF;
		box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
		display: block;
		/*width: 300px;*/
	}
	.main-button:hover {
		text-decoration: none;
		color: #FFF;
		background-color: #d42720;
		box-shadow: 0 0 1px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.24);
	}
	
	.search-button {
		margin-top: 8px;
		padding: 10px 30px;
		font-size: 1rem;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}

	.search-button:hover {
		box-shadow: 0 0 1px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.24);
		background-color: #d42720;
		box-shadow: 0px
	}

	@media screen and (max-width: 640px) {
		.home-wrapper {
			height: auto;
			min-height: 480px;
			padding: 0 10px;
			display: block;
		}
		nav{
			margin-top: 0; 
			height: 100px;
			padding-top: 0;
			margin-bottom: 40px; 
		}
		.home-wrapper .header-logo {
			width: 200px;
			margin-top: 140px; 
		}
		.home-wrapper nav{
			margin-top: 0;
		}
		.hero h1 {
			font-size: 1.4rem;
			line-height: 1.5;
		}
		.hero p {
			font-size: 0.9rem;
		}
		.search-area {
			margin-top: 0;
		}
		.encouraging-text {
			font-size: 1rem;
		}
		.donation-aria {
			width: 90%;
			height: 150px;
			flex-direction: column;
			padding: 20px;
			text-align: center;
		}
		.search-button {
			width: 200px;
		}
	}



</style>