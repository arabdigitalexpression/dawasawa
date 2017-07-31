<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 100px;"></div>	
			</div>
			<br class="uk-visible@s">
			<p class="info">
إذا وُجدت إدراجات مرتبطة بعنوان البريد الذي أدخلته فسوف تُرسل إليك رسالة تحوي معلومات عن تلك الإدراجات.
			</p>

			<form id="my-entries-form" class="uk-form-stacked">
				<div class="uk-margin">
					<label class="uk-form-label" for="email">عنوان البريد الإلكتروني</label>
					<div class="uk-form-controls uk-inline">
			            <input v-model="email" class="uk-input" id="email" type="email" placeholder="ستصلك رسالة على هذا العنوان تحوي معلومات عن إدراجاتك">
			            <div v-if="validationErrors.email.error" class="form-error">
			            	{{ emailError }}
			            </div>
			        </div>
				</div>
				<button v-on:click.stop="submitListEntries" id="#my-entries-submit" class="uk-button uk-button-primary">إرسال</button>
			</form>
		</div>
		<div v-if="pageLoading" uk-spinner></div>
		<div v-if="captchaRequested" class="captcha-container">
			<p>إنسان أم روبوت</p>
			<br>
			<div v-html="captcha" class="captcha-data"></div>
			<div class="captcha-solution">
				<form>
					<button v-on:click.stop.prevent="requestCaptcha" class="uk-button-primary" >صعبة ! أظهر غيرها</button>
					<input v-model="captchaValue" type="text" id="captcha-value" placeholder="أدخل في الحقل النّصي المحارف التي تراها في الصورة">
					<div v-if="captchaLoading" uk-spinner></div>
					<span v-if="captchaTrue" style="color: green;" uk-icon="icon: check; ratio: 1.4"></span>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/nav_bar.vue';

	// notifications
	import listEntriesSuccess from '../notifications/listentries_success.json'
	import formError from '../notifications/form_error.json'
	import responseError from '../notifications/response_error.json'
	import validator from 'validator'

	let validationErrors = require('../data/validation_errors.json')

	const navigation = require('../data/navigation.json');
	const config = require('../config.json')

	export default {
		data() {
			return {
				// page name
				pagename: navigation.request_entries.name,

				//notifications
				listEntriesSuccess,
				formError,
				responseError,

				validationErrors,		// form error messages

				// form data
				email: "", // email

				// error messages
				emailError: "", 

				// captcha
				captcha: "", // captca image
				captchaValue: "", // the value the user enters
				captchaRequested: false, // the captcha is requested (display the captcha container)
				captchaLoading: false, // waiting for server response 
				captchaTrue: false, // the response of the server

				// loading indicator
				pageLoading: false
			}
		},
		components: {
			'ds-nav': Navbar
		},
		methods: {
			validateEmail() {
				if(this.email === "") {
					// email is empty
					this.validationErrors.email.error = true
					this.emailError = this.validationErrors.email.msg2
				} else {
					let result = validator.isEmail(this.email)
					if(result === false) {
						// email is not valid
						this.validationErrors.email.error = true
						this.emailError = this.validationErrors.email.msg1
					} else {
						// email is valid
						this.validationErrors.email.error = false
						this.emailError = ""
					}
				}
			},
			checkForErrors() {
				/*
				 *	Check for email error flag
				 */
				if(this.validationErrors.email.error === true)
					return true
			},
			submitListEntries(event) {
				event.preventDefault()

				this.validateEmail()

				// check for errors
				let err = this.checkForErrors()
				if(err === true) {
					// display error alert
					UIkit.modal.dialog('<p class="alert-text">' + formError.message + '</p>')
					return
				} else {
					// submit the form
					this.submitRequest()
				}
			},
			submitRequest() {
				this.pageLoading = true
				let url = config.server_url + '/api/list_entries'


				let body = {
					"email_address" : this.email
				}

				// request my list
				this.$http.post(url, body, { "credentials": true }).then(response=> {
					// request success
					this.pageLoading = false
					this.$router.push({ path: 'email_sent', query: { type: 1 } })
				}, response=> {
					if(response.status == 401) {
						this.pageLoading = false
						// user is not recognized as a human
						this.requestCaptcha()
					}
					if(response.status == 404) {
						this.pageLoading = false;
						UIkit.modal.dialog('<p class="alert-text">' + "لا توجد إدراجات لهذا البريد الإلكترونى" + '</p>')
					} else if(response.status == 500) {
						this.pageLoading = false
						// an error has occured
						UIkit.modal.dialog('<p class="alert-text">' + responseError.message + '</p>')
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
					UIkit.modal.dialog('<p class="alert-text">' + responseError.message + '</p>')
					this.captchaRequested = false
				})
			},
			postCaptcha(value) {
				let url = config.server_url + '/captcha'
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
			}
		},
		watch: {
			email: function() {
				this.validateEmail()
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
				if(this.captchaTrue == true) {
					this.captchaRequested = false
					this.submitRequest()
				}
			}
		}
	}
</script>

<style>
	.info {
		color: #e84c3d;
	}
	#my-entries-form {
		margin-top: 30px;
	}
	#my-entries-form  .uk-input, #my-entries-form  .uk-textarea {
		width: 640px;
	}
	@media screen and (max-width: 640px) {
		.info {
			text-align: center;
		}
		#my-entries-form {
			margin-top: 10px;
		}
		#my-entries-form  .uk-input, #my-entries-form  .uk-textarea {
			font-size: 0.8rem;
			min-width: 300px;
			width: 640px;
		}
	}
</style>
