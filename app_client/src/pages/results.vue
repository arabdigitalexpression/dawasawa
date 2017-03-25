<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 100px;"></div>	
			</div>
			<div class="search-aria">
				<form v-on:submit.prevent="submitSearch" id="search-page-form">
					<input type="text" v-model="searchKey" class="uk-input">
					<select v-model="governorate" id="governorate" class="uk-select">
						<option>كلّ المحافظات</option>
		            	<option v-for="gov in governorates" :value="gov">
		            		{{ gov }}
		            	</option>
				    </select>
				    <button class="uk-button-primary card-1 hoverable">ابحث</button>
				</form>
			</div>

			<div class="results">
				<!-- empty result -->
				<div v-if="isempty">{{ emptyResult }}</div>
				<!-- medicine results -->
				<div v-else="isempty" v-for="med in results" class="medicine-container card-1 hoverable">
					<div class="medicine-col">
						<h4 class="medicine-name">{{ med.latin_name }}</h4>
						<h4 class="medicine-name">{{ med.arabic_name }}</h4>
						<p class="medicine-date">تاريخ إنتهاء الصلاحية : {{med.expiry_date}}</p>
						<p class="medicine-data">حالة العبوه : {{med.package_state}}</p>
						<p class="medicine-data">المحافظة : {{med.governorate}}</p>
					</div>
					<div class="medicine-col">
						<a @click.prevent="showInfo(medicineUrl + med.accessToken)" v-bind:href="medicineUrl + med.accessToken" class="uk-button-primary contact-button" uk-icon="icon: phone">بيانات الإتصال</a>
					</div>
				</div>
			</div>
		</div>
		<div v-if="pageLoading" uk-spinner></div>
		<div v-if="captchaRequested" class="captcha-container">
			<p>إنسان ام روبوت</p>
			<br>
			<div v-html="captcha" class="captcha-data"></div>
			<div class="captcha-solution">
				<form>
					<button v-on:click.stop.prevent="requestCaptcha" class="uk-button-primary" >صعبة ! إطلب غيرها</button>
					<input v-model="captchaValue" type="text" id="captcha-value" placeholder="انقل الرموز السابقة">
					<div v-if="captchaLoading" uk-spinner></div>
					<span v-if="captchaTrue" style="color: green;" uk-icon="icon: check; ratio: 1.4"></span>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/nav_bar.vue'
	import Alert from '../components/alert.vue'

	import responseError from '../notifications/response_error.json'

	const navigation = require('../data/navigation.json')
	const governorates = require('../data/governorates.json')
	const config = require('../config.json')

	export default {
		data() {
			return {
				pagename: navigation.results.name,
				governorates,

				searchKey: "",
				governorate: "",

				//notifications
				responseError,

				// loading indicator
				pageLoading: false,

				// empty result
				emptyResult: "لم يتم العثور على نتائج",
				isempty: false,

				medicineUrl: config.server_url + "/api/medicine/",

				// medicine results
				results: [],
				count: "",

				// medicine
				latinName: "",			// medicine latin name
				arabicName: "",			// medicine arabic name
				expireDate: "",			// medicine expire date
				packageState: "",		// medicine package state
				governorate: "",		// medicine governorate
				notes: "",				// medicine notes
				username: "",			// user name
				email: "",				// user email
				phone: "",				// user phone


				// captcha
				captcha: "", // captca image
				captchaValue: "", // the value the user enters
				captchaRequested: false, // the captcha is requested (display the captcha container)
				captchaLoading: false, // waiting for server response 
				captchaTrue: false, // the response of the server
			}
		},
		components: {
			'ds-nav': Navbar,
			'ds-alert': Alert
		},
		methods: {
			search(name, gov) {
				this.pageLoading = true
				// set request QueryString and Url
				let query = "?name=" + name + "&gov=" + gov 
				let url = config.server_url + '/api/search/' + query

				// initiate request
				this.$http.get(url, { "credentials": true }).then(response=> {
					this.pageLoading = false
					this.isempty = false
					this.count = response.data.length
					this.results = response.data
				}, response => {
					// error
					this.pageLoading = false
					if(response.status === 404) {
						this.isempty = true
					} else {
						UIkit.notification({
						    message: responseError.message,
						    status: 'warning',
						    pos: 'top-center',
						    timeout: 3000
						});
					}
				})
			},
			showInfo(url) {
				this.pageLoading = true
				this.$http.get(url, { "credentials": true }).then(response=> {
					// success
					this.pageLoading = false

					

				}, response => {
					this.pageLoading = false
					if(response.status === 401) {
						// unautorized
						// user is not recognized as a human
						this.requestCaptcha()
					} else {
						UIkit.notification({
							message: this.responseError.message,
							status: 'danger',
							pos: 'top-center',
							timeout: 5000
						})
					}
				})
			},
			requestCaptcha() {
				let url = config.server_url + '/captcha'

				this.captchaTrue = false
				this.captchaRequested = false
				this.captchaValue = ""
				this.captchaLoading = false

				this.$http.get(url, { "credentials": true }).then(response=> {
					
					if(response.status == 200) {
						this.captcha = response.body
						this.captchaRequested = true
					}
					
				}, response => {
					//error
					UIkit.notification({
						message: this.responseError.message,
						status: 'danger',
						pos: 'top-center',
						timeout: 5000
					})
					this.captchaRequested = false
				})
			},
			postCaptcha(value) {
				let url = 'http://localhost/captcha'
				let body = {
					"value" : value
				}
				this.$http.post(url, body, { "credentials": true }).then(response=> {
					console.log(response.status)
					if(response.status == 200) {
						this.captchaTrue = true
						this.captchaLoading = false
						$('#captcha-value').removeClass('uk-form-danger')
						$('#captcha-value').addClass('uk-form-success')
					}
				}, response=> {
					console.log(response.status)
					this.captchaTrue = false
					this.captchaLoading = false
					$('#captcha-value').addClass('uk-form-danger')
					$('#captcha-value').removeClass('uk-form-success')
				})
			}
		},
		mounted() {
			this.searchKey = this.$route.query.name
			this.governorate = this.$route.query.gov || "كلّ المحافظات"
			this.search(this.searchKey, this.governorate)
		},
		watch: {
			captchaValue: function() {
				$('#captcha-value').removeClass('uk-form-danger')
				$('#captcha-value').removeClass('uk-form-success')
				let value = this.captchaValue
				if(value.length >= 4) {
					this.captchaLoading = true
					this.postCaptcha(value)
				}		
			},
			captchaTrue: function() {
				if(this.captchaTrue == true) {
					this.captchaRequested = false
				}
			}
		}
	}
</script>

<style>
	#search-page-form {
		margin-top: 20px;
		max-width: 1200px;
		display: flex;
		flex-direction: row;
	}
	#search-page-form input {
		max-width: 1200px;
		min-width: 250px;
		margin-left: 20px;
	}
	#search-page-form select {
		max-width: 250px;
		min-width: 150px;
		margin-left: 20px;
	}
	#search-page-form button {
		max-width: 200px;
		min-width: 100px;
	}
	.contact-button {
		float: left;
		padding: 8px 20px;
		box-shadow: 0 2px 5px rgba(0,0,0,0.25), 0 2px 5px rgba(0,0,0,0.22);
  		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
	.contact-button:hover {
		box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		text-decoration: none;
	}
	.contact-button > svg {
		margin-right: 10px;
	}

	@media screen and (max-width: 640px) {
		#search-page-form {
			margin-top: 0;
			flex-direction: column;
			margin-bottom: 50px;
		}
		#search-page-form input {
			margin-left: 0;
			margin-bottom: 20px;
		}
		#search-page-form select {
			max-width: 640px;
			min-width: 250px;
			margin-left: 0;
			margin-bottom: 20px;
		}
		#search-page-form button {
			padding: 5px 0;
			font-size: 1rem;
			max-width: 640px;
			min-width: 250px;
		}
	}
</style>