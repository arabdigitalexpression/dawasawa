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
				 	<input type="text" v-model="searchKey" class="uk-input" list="matchlist"> 
				 	<datalist id="matchlist">
				 		<option v-for="key in keywords" :value="key"></option>
				 	</datalist>
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
				<div v-else="isempty" v-for="med in display" class="medicine-container card-1 hoverable">
					<div class="medicine-col">
						<h4 class="medicine-name">{{ med.latin_name }}</h4>
						<h4 class="medicine-name">{{ med.arabic_name }}</h4>
						<p class="medicine-date">تاريخ إنتهاء الصلاحية : {{med.expiry_date}}</p>
						<p class="medicine-data">حالة العبوه : {{med.package_state}}</p>
						<p class="medicine-data">المحافظة : {{med.governorate}}</p>
					</div>
					<div class="medicine-col">
						<a @click.prevent="showInfo(medicineUrl + med.accessToken)" uk-toggle=" target: #medicine-modal" v-bind:href="medicineUrl + med.accessToken" class="uk-button-primary contact-button" uk-icon="icon: phone">بيانات الإتصال</a>
					</div>
				</div>
			</div>
			<br>
			<ul class="uk-pagination uk-flex-center">
				<li><a @click.prevent="previousPage()" href="#"><span uk-pagination-previous></span></a></li>
				<li v-for="n in pages(count)"><a @click.prevent="showPage(n)" href="#">{{ n }}</a></li>
				<li><a @click.prevent="nextPage()" href="#"><span uk-pagination-next></span></a></li>
			</ul>
		</div>
		<div v-if="pageLoading" uk-spinner></div>

		<div id="medicine-modal" uk-modal>
			<div class="uk-modal-dialog uk-modal-body">
				<button v-on:click="clearMedicine" class="uk-modal-close-default" type="button" uk-close></button>
				<h2 class="uk-modal-title">بيانات الدواء</h2>
				<div class="medicine-info">
					<div><span>الإسم باللاتينية:</span><span>{{ medLatinName }}</span></div>
					<div><span>الإسم بالعربية:</span><span>{{ medArabicName }}</span></div>
					<div><span>تاريخ إنتهاء الصلاحية:</span><span>{{ medExpireDate }}</span></div>
					<div><span>حالة العبوه:</span><span>{{ medPackageState }}</span></div>
					<div><span>المحافظة:</span><span>{{ medGovernorate }}</span></div>
					<div><span>ملاحظات:</span><span>{{ medNotes }}</span></div>
					<div>
						<h4>بيانات الإتصال</h4>
						<div><span>الإسم:</span><span>{{ medUsername }}</span></div>
						<div><span>البريد الإلكترونى:</span><span>{{ medEmail }}</span></div>
						<div><span>رقم الهاتف:</span><span>{{ medPhone }}</span></div>
					</div>
				</div>
			</div>
		</div>

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
	import validator from 'validator'

	import responseError from '../notifications/response_error.json'

	const navigation = require('../data/navigation.json')
	const governorates = require('../data/governorates.json')
	const config = require('../config.json')

	let validationErrors = require('../data/validation_errors.json')


	export default {
		data() {
			return {
				pagename: navigation.results.name,
				governorates,

				searchKey: "",
				governorate: "",

				keywords: [],

				//notifications
				responseError,

				// validation errors
				validationErrors, 

				// loading indicator
				pageLoading: false,

				// empty result
				emptyResult: "لم يتم العثور على نتائج",
				isempty: false,

				medicineUrl: config.server_url + "/api/medicine/",
				currentUrl: "",

				// medicine results
				results: [], // returned results
				display: [], // currently displayed results
				count: "", // number of total results
				page: "", // current page number

				// medicine
				medLatinName: "",			// medicine latin name
				medArabicName: "",			// medicine arabic name
				medExpireDate: "",			// medicine expire date
				medPackageState: "",		// medicine package state
				medGovernorate: "",		// medicine governorate
				medNotes: "",				// medicine notes
				medUsername: "",			// user name
				medEmail: "",				// user email
				medPhone: "",				// user phone


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
						this.$router.push({ path: 'search', query: { name: this.searchKey, gov: this.governorate } })
						location.reload()
					}
				}
			},
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
					this.page = 1
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
			pages(count) {
				return Math.ceil( count/10 )
			},
			showPage(page) {
				this.page = page
			},
			previousPage() {
				if(this.page != 1) {
					this.page--
				}
			},
			nextPage() {
				if(this.page != Math.ceil( this.count/10 )) {
					this.page++
				}
			},
			showInfo(url) {
				this.pageLoading = true
				this.currentUrl = url 
				this.$http.get(url, { "credentials": true }).then(response=> {
					// success
					this.pageLoading = false

					// medicine
					this.medLatinName = response.data.latin_name						// medicine latin name
					this.medArabicName = response.data.arabic_name || "غير متاح"		// medicine arabic name
					this.medExpireDate = response.data.expiry_date						// medicine expire date
					this.medPackageState = response.data.package_state					// medicine package state
					this.medGovernorate = response.data.governorate					// medicine governorate
					this.medNotes = response.data.notes || "غير متاح"					// medicine notes
					this.medUsername = response.data.contact.name					// user name
					this.medEmail = response.data.contact.email_address || "غير متاح"			// user email
					this.medPhone = response.data.contact.phone || "غير متاح"			// user phone

				}, response => {
					this.pageLoading = false

					$('#medicine-modal').hide()

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
					if(response.status == 200) {
						this.captchaTrue = true
						this.captchaLoading = false
						$('#captcha-value').removeClass('uk-form-danger')
						$('#captcha-value').addClass('uk-form-success')
					}
				}, response=> {
					this.captchaTrue = false
					this.captchaLoading = false
					$('#captcha-value').addClass('uk-form-danger')
					$('#captcha-value').removeClass('uk-form-success')
				})
			},
			clearMedicine() {
				// medicine
				this.medLatinName = ""						// medicine latin name
				this.medArabicName = ""		// medicine arabic name
				this.medExpireDate = ""						// medicine expire date
				this.medPackageState = ""					// medicine package state
				this.medGovernorate = ""				// medicine governorate
				this.medNotes = ""					// medicine notes
				this.medUsername = ""					// user name
				this.medEmail = ""			// user email
				this.medPhone = ""			// user phone
			}
		},
		mounted() {
			this.searchKey = this.$route.query.name
			this.governorate = this.$route.query.gov || "كلّ المحافظات"
			this.search(this.searchKey, this.governorate)
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
			},
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
				if(this.captchaTrue === true) {
					this.captchaRequested = false
					location.reload()
				}
			},
			page: function() {
				let startIndex = ( this.page - 1 ) * 10
				if(this.page == 1) {
					 if(this.count < 10) {
						$('.uk-pagination-previous').addClass('uk-hidden')
						$('.uk-pagination-next').addClass('uk-hidden')
						this.display = this.results.slice(startIndex, ( startIndex + ( this.count % 10 ) ) )
					} else {
						$('.uk-pagination-previous').addClass('uk-hidden')
						$('.uk-pagination-next').removeClass('uk-hidden')
						this.display = this.results.slice(startIndex, (startIndex + 10) )
					}
				} else if (this.page == Math.ceil( this.count/10 )) {
					$('.uk-pagination-previous').removeClass('uk-hidden')
					$('.uk-pagination-next').addClass('uk-hidden')
					this.display = this.results.slice(startIndex, ( startIndex + ( this.count % 10 ) ) )
				} else {
					$('.uk-pagination-next').removeClass('uk-hidden')
					$('.uk-pagination-previous').removeClass('uk-hidden')
					this.display = this.results.slice(startIndex, (startIndex + 10) )
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

	.uk-pagination li a {
		font-size: 1.3rem;
	}

	.medicine-info span {
		color: #000;
		margin-right: 10px;
		font-size: 0.9rem;
	}

	.medicine-info div {
		margin-bottom: 10px;
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