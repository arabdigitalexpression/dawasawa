<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 100px;"></div>	
			</div>
			<div>
				<form v-on:submit.prevent id="emailus-form" class="uk-form-stacked">
					<div class="uk-margin">
						<label class="uk-form-label" for="username">نحب مخاطبتك باسمك عند التواصل معك</label>
						<div class="uk-form-controls uk-inline">
				            <input class="uk-input" id="username" v-model="username" type="text" placeholder="فلان الفلاني">
				        	<div v-if="validationErrors.required.error" class="form-error">
				            	{{ usernameError }}
				            </div>
				        </div>
					</div>
					<div class="uk-margin">
						<label class="uk-form-label" for="email">عنوان البريد الإلكتروني</label>
						<div class="uk-form-controls uk-inline">
				            <input class="uk-input" id="email" v-model="email" type="email" placeholder="عنوان بريدك الإلكتروني مطلوب لنتمكن من الردّ عليك إذا لزم الأمر">
				        	<div v-if="validationErrors.email.error" class="form-error">
				            	{{ emailError }}
				            </div>
				        </div>
					</div>
					<div class="uk-margin">
						<label class="uk-form-label" for="message">الرسالة</label>
						<div class="uk-form-controls">
				            <textarea v-model="message" id="message" class="uk-textarea" rows="5"></textarea>
				        </div>
					</div>
					<button @click="submit" id="email-us-submit" class="uk-button uk-button-primary">إرسال</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/nav_bar.vue'
	import Alert from '../components/alert.vue'
	import validator from 'validator'

	// notifications
	import emailusSuccess from '../notifications/emailus_success.json'
	import formError from '../notifications/form_error.json'
	import responseError from '../notifications/response_error.json'

	const navigation = require('../data/navigation.json')
	const config = require('../config.json')

	let validationErrors = require('../data/validation_errors.json')

	export default {
		data() {
			return {
				pagename: navigation.emailus.name,
				//notifications
				emailusSuccess,
				formError,
				responseError,

				validationErrors,		// form error messages

				// form fields
				username: "",			// user name
				email: "",				// user email
				message: "",			// user message

				// error messages
				usernameError: "",
				emailError: "",

				submitResponse:"", // the response of the server to form submission

				// loading indicator
				pageLoading: false
			}
		},
		components: {
			'ds-nav': Navbar,
			'ds-alert': Alert
		},
		methods: {
			cleanErrorFlags() {
				// cleans all the error flags
				this.validationErrors.latinName.error = false
				this.validationErrors.arabicName.error = false
				this.validationErrors.expireDate.error = false
				this.validationErrors.expireDate.error = false
				this.validationErrors.expireDate.error = false
				this.validationErrors.required.error = false
				this.validationErrors.email.error = false
				this.validationErrors.phone.error = false
			},
			validateUsername() {
				if(this.username == "") {
					// username is empty
					this.validationErrors.required.error = true
					this.usernameError = this.validationErrors.required.msg1
				} else {
					// username is entered
					this.validationErrors.required.error = false
					this.usernameError = ""
				}
			},
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
				 *	Check for error flags
				 */
				if(this.validationErrors.required.error === true)
					return true
				if(this.validationErrors.email.error === true)
					return true
			},
			submit() {
				// check for errors
				this.validateUsername()
				this.validateEmail()

				let err = this.checkForErrors()
				if(err === true) {
					// found errors
					UIkit.notification({
						message: this.formError.message,
						status: 'danger',
						pos: 'top-center',
						timeout: 3000
					})
					return
				} else {
					// no form errors

					// start page loading
					this.pageLoading = true
					let url = config.server_url + '/api/emailus' // api url

					let body = {
						username: this.username,
						email: this.email,
						message: this.message
					}

					// post the message
					this.$http.post(url, body, { "credentials": true }).then(response=> {
						// request success
						if(response.status == 200) {
							this.pageLoading = false
							UIkit.notification({
								message: this.emailusSuccess.message,
								status: 'success',
								pos: 'bottom-center',
								timeout: 3000
							})
						}	
					}, response=> {
						// response error
						this.pageLoading = false
						// an error has occured
						UIkit.notification({
							message: this.responseError.message,
							status: 'danger',
							pos: 'bottom-center',
							timeout: 3000
						})
					})
				}
			}
		},
		watch: {
			username: function() {
				this.validateUsername()
			},
			email: function() {
				this.validateEmail()
			}
		},
		mounted() {
			this.cleanErrorFlags()

		}
	}
</script>

<style>
	#emailus-form {
		margin-top: 30px;
	}
	#emailus-form  .uk-input, #emailus-form  .uk-textarea {
		width: 640px;
	}
	@media screen and (max-width: 640px) {
		#emailus-form {
			margin-top: 10px;
		}
		#emailus-form  .uk-input, #emailus-form  .uk-textarea {
			font-size: 0.8rem;
			min-width: 300px;
			width: 640px;
		}
	}
</style>