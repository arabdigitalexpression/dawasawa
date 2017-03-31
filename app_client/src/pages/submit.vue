<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 100px;"></div>	
			</div>
			<div class="tabs-wrapper">
				<ul id="submit-tabs" class="tab-toggle" uk-tab>
					<li id="medicine-form-toggle"><a href="#">بيانات الدواء</a></li>
					<li id="contact-form-toggle"><a href="#">بيانات الإتصال</a></li>
				</ul>
				<ul id="submit-forms" class="uk-switcher">
					<li id="medicine-form">
						<form class="uk-form-stacked">
							<div class="uk-margin">
								<label class="uk-form-label" for="latin-name">*الاسم بالأحرف اللاتينية</label>
								<div class="uk-form-controls">
						            <input v-model="latinName" class="uk-input" id="latin-name" type="text" placeholder="بدقّة كما على العبوّة">
						            <div v-if="validationErrors.latinName.error" class="form-error">
						       			{{ latinNameError }}
						            </div>
						        </div>
							</div>
						
							<div class="uk-margin">
								<label class="uk-form-label" for="arabic-name">الاسم بالعربية</label>
								<div class="uk-form-controls">
						            <input v-model="arabicName" class="uk-input" id="arabic-name" type="text" placeholder="للتوضيح لكنه لا يُستخدم في البحث">
						            <div v-if="validationErrors.arabicName.error" class="form-error">
						       			{{ arabicNameError }}
						            </div>
						        </div>
							</div>
							
							<div class="uk-margin">
								<label class="uk-form-label" for="expire-date">*تاريخ انتهاء الصلاحية</label>
								<div class="uk-form-controls">
						            <input type="text" id="expire-date">
						            <div v-if="validationErrors.expireDate.error" class="form-error">
						            	{{ expireDateError }}
						            </div>
						        </div>
							</div>
							<div class="uk-margin">
								<label class="uk-form-label" for="package-state">*حالة العبوة</label>
								<div class="uk-form-controls">
						            <select v-model="packageState" id="package-state" class="uk-select">
						            	<option v-for="state in packageStates" :value="state">
						            		{{ state }}
						            	</option>
								    </select>
								    <div v-if="validationErrors.required.error" class="form-error">
						            	{{ packageStateError }}
						            </div>
						        </div>
							</div>
							<div class="uk-margin">
								<label class="uk-form-label" for="governorate">*اختر المحافظة</label>
								<div class="uk-form-controls">
						            <select v-model="governorate" id="governorate" class="uk-select">
						            	<option v-for="gov in governorates" :value="gov">
						            		{{ gov }}
						            	</option>
								    </select>
								    <div v-if="validationErrors.required.error" class="form-error">
						            	{{ governorateError }}
						            </div>
						        </div>
							</div>
							<div class="uk-margin">
								<label class="uk-form-label" for="notes">ملاحظات</label>
								<div class="uk-form-controls">
						            <textarea v-model="notes" id="notes" class="uk-textarea" rows="5"></textarea>
						        </div>
							</div>
							<br>
							<button v-on:click="showContactForm" class="uk-button uk-button-primary">بيانات الإتصال</button>				
						</form>
					</li>
					<li id="contact-form">
						<form class="uk-form-stacked">
							<div class="uk-margin">
								<label class="uk-form-label" for="username">*الاسم</label>
								<div class="uk-form-controls uk-inline">
						            <input v-model="username" class="uk-input" id="username" type="text" placeholder="اسمك ليتواصل به معك من يطلب الدواء">
						            <div v-if="validationErrors.required.error" class="form-error">
						            	{{ usernameError }}
						            </div>
						        </div>
							</div>

							<div class="uk-margin">
								<label class="uk-form-label" for="email">*عنوان البريد الإلكتروني</label>
								<div class="uk-form-controls">
						            <input v-model="email" class="uk-input" id="email" type="email" placeholder="ستصلك رسالة على هذا العنوان لاستكمال الإجراء">
						            <div v-if="validationErrors.email.error" class="form-error">
						            	{{ emailError }}
						            </div>
						        </div>
							</div>

							<div class="uk-margin">
								<label class="uk-form-label" for="email_visible">لا أرغب في ظهور عنوان بريدي مع بيانات الإدراج و&nbsp;سأضع رقم هاتف </label>
								<div class="uk-form-controls"> 
						            <input v-model="emailInvisible" class="uk-checkbox" id="email_visible" type="checkbox">
						        </div>
							</div>

							<div class="uk-margin">
								<label class="uk-form-label" for="phone"><span :hidden="!emailInvisible">*</span>رقم الهاتف</label>
								<div class="uk-form-controls">
						            <input v-model="phone" class="uk-input" id="phone" type="text" placeholder="رقم هاتف ليتواصل معك عبره من يطلب الدواء">
						            <div v-if="validationErrors.phone.error" class="form-error">
						            	{{ phoneError }}
						            </div>
						        </div>
							</div>
							<br>
							<div class="uk-margin">
								<label class="uk-form-label" for="terms-agreed">أوافق على <a href="#terms-modal" uk-toggle>شروط الخدمة</a></label>
								<div class="uk-form-controls uk-inline"> 
					            	<input v-model="agreedOnTerms" class="uk-checkbox" id="terms-agreed" type="checkbox">
					        	</div>
					        </div>
					       
							<button v-on:click.stop="submitMedicineForm" :disabled="!agreedOnTerms" id="#submit-button" class="uk-button uk-button-primary">إدخال</button>	
						</form>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="pageLoading" uk-spinner></div>
		<ds-terms-modal></ds-terms-modal>
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
	import TermsModal from '../components/terms_modal.vue'
	import validator from 'validator'

	// notifications
	import submitSuccess from '../notifications/submit_success.json'
	import formError from '../notifications/form_error.json'
	import responseError from '../notifications/response_error.json'

	const navigation = require('../data/navigation.json')
	const governorates = require('../data/governorates.json')
	const packageStates = require('../data/package_state.json')
	let validationErrors = require('../data/validation_errors.json')
	const config = require('../config.json')

	$(function() {
      var now = Date()
      $( "#expire-date").datepicker({ minDate: 30 });
      $("#expire-date").datepicker("option", "dateFormat", "mm/dd/yy");
    })

	function validateDate(date) {
		let bits = date.split('/');
		let d = new Date(bits[2], bits[0] , bits[1] - 1);
		return d && (d.getMonth() + 1) == ( parseInt( bits[0] ) + 1 );
	}

	export default {
		data() {
			return {
				pagename: navigation.submit.name,
				governorates,
				packageStates,

				//notifications
				submitSuccess,
				formError,
				responseError,

				validationErrors,		// form error messages

				// form fields
				latinName: "",			// medicine latin name
				arabicName: "",			// medicine arabic name
				expireDate: "",			// medicine expire date
				packageState: "",		// medicine package state
				governorate: "",		// medicine governorate
				notes: "",				// medicine notes
				username: "",			// user name
				email: "",				// user email
				phone: "",				// user phone
				emailInvisible: false,	// user email is visible 
				agreedOnTerms: false,	// user agreed on term

				// error messages
				latinNameError: "",
				arabicNameError: "",
				expireDateError: "",
				packageStateError: "",
				governorateError: "",
				usernameError: "",
				emailError: "",
				phoneError: "",

				submitResponse:"", // the response of the server to form submission

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
			'ds-nav': Navbar,
			'ds-terms-modal': TermsModal
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
			showContactForm(event) {
				event.preventDefault()

				this.validateLatinName()
				this.validateArabicName()
				this.validateExpireDate()
				this.validatePackageState()
				this.validateGovernorate()

				// check for errors
				let err = this.checkForErrors()
				if(err === true) {
					// found errors
					UIkit.notification({
						message: this.formError.message,
						status: 'danger',
						pos: 'top-center',
						timeout: 5000
					})
					return
				} else {
					// no errors

					// show contact form
					$('#medicine-form-toggle').attr("aria-expanded", function() {
						return false
					}).removeClass('uk-active');

					$('#contact-form-toggle').attr("aria-expanded", function() {
						return true
					}).addClass('uk-active');

					$('#medicine-form').removeClass('uk-active');

					$('#contact-form').addClass('uk-active');
				}
			},
			validateLatinName() {
				let result = validator.isAscii(this.latinName)
				if(this.latinName === "") {
					// latin name is empty
					this.validationErrors.latinName.error = true
					this.latinNameError = this.validationErrors.required.msg1
				} else if (result === false) {
					// latin name is written with non latin letters
					this.validationErrors.latinName.error = true
					this.latinNameError = this.validationErrors.latinName.msg
				} else {
					// latin name is valid
					this.validationErrors.latinName.error = false
					this.latinNameError = ""
				}
			},
			validateArabicName() {
				let result = validator.isAlphanumeric(this.arabicName, 'ar-EG')
				if(this.arabicName != "" && result === false) {
					// arabic name is written with latin characters
					this.arabicNameError = this.validationErrors.arabicName.msg
					this.validationErrors.arabicName.error = true
				} else {
					// arabic name is valid
					this.arabicNameError = ""
					this.validationErrors.arabicName.error = false
				}
			},
			validateExpireDate() {
				this.expireDate = $('#expire-date').val()
				if(this.expireDate === ""){
					// date is empty
					this.validationErrors.expireDate.error = true
					this.expireDateError = this.validationErrors.expireDate.msg2
				} else {
					let result = validateDate(this.expireDate)
					if(result === false) {
						// date error
						this.validationErrors.expireDate.error = true
						this.expireDateError = this.validationErrors.expireDate.msg1
					} else {
						// date correct
						this.validationErrors.expireDate.error = false
						this.expireDateError = ""
					}
				}
			},
			validatePackageState() {
				if(this.packageState === "") {
					// packageState is empty
					this.validationErrors.required.error = true
					this.packageStateError = validationErrors.required.msg1
				} else {
					// packageState is valid
					this.validationErrors.required.error = false
					this.packageStateError = ""
				}
			},
			validateGovernorate() {
				if(this.governorate === "") {
					// governorate is empty
					this.validationErrors.required.error = true
					this.governorateError = validationErrors.required.msg1
				} else {
					// governorate is valid
					this.validationErrors.required.error = false
					this.governorateError = ""
				}
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
			validatePhone() {
				let isNumberResult = validator.isNumeric(this.phone)
				let isPhoneResult = validator.isLength(this.phone, { min: 0, max: 15 })
				let isAlphanumeric = validator.isAlphanumeric(this.phone, 'ar-EG')
				let isAlpha = validator.isAlpha(this.phone, 'ar-EG')

				if(this.emailInvisible === true && this.phone === "") {
					// phone is required
					this.validationErrors.phone.error = true
					this.phoneError = this.validationErrors.phone.msg1
					return
					
				} else {
					// phone is not required
					this.validationErrors.phone.error = false
					this.phoneError = ""
				}

				if(isNumberResult === false && this.phone != "") {
					// phone number contain characters
					this.validationErrors.phone.error = true
					this.phoneError = this.validationErrors.phone.msg2
					return
				} else {
					this.validationErrors.phone.error = false
					this.phoneError = ""
				}

				if (isPhoneResult === false) {
					// phone number is too long > 15 
					this.validationErrors.phone.error = true
					this.phoneError = this.validationErrors.phone.msg2
					return
				} else {
					// phone number is valid
					this.validationErrors.phone.error = false
					this.phoneError = ""
				}	
			},
			checkForErrors() {
				/*
				 *	Check for error flags
				 */
				if(this.validationErrors.latinName.error === true)
					return true
				if(this.validationErrors.arabicName.error === true)
					return true
				if(this.validationErrors.expireDate.error === true)
					return true
				if(this.validationErrors.required.error === true)
					return true
				if(this.validationErrors.email.error === true)
					return true
				if(this.validationErrors.phone.error === true)
					return true
			},
			submitMedicineForm(event) {
				event.preventDefault()
				// validate form
				this.validateLatinName()
				this.validateArabicName()
				this.validateExpireDate()
				this.validatePackageState()
				this.validateGovernorate()
				this.validateUsername()
				this.validateEmail()
				this.validatePhone()
				
				// check for errors
				let err = this.checkForErrors()
				if(err === true) {
					// display error alert
					UIkit.notification({
						message: this.formError.message,
						status: 'danger',
						pos: 'top-center',
						timeout: 5000
					})
					return
				} else {
					// submit the form
					this.submitRequest()
				}
			},
			submitRequest() {
				this.pageLoading = true
				let url = config.server_url + '/api/submit'
				let expDate = $('#expire-date').val()

				let body = {
					latin_name: this.latinName,
					expiry_date: expDate,
					package_state: this.packageState,
					governorate: this.governorate,
					contact: {
						name: this.username,
						email_address: this.email,
						email_invisible: this.emailInvisible
					},
					terms_accepted: this.agreedOnTerms
				}

				if(this.arabicName != "") {
					body.arabic_name = this.arabicName
				}

				if(this.notes != "") {
					body.notes = this.notes
				}

				if(this.phone != "") {
					body.contact.phone = this.phone
				}

				// post the medicine
				this.$http.post(url, body, { "credentials": true }).then(response=> {
					// request success
					this.pageLoading = false
					UIkit.notification({
						message: this.submitSuccess.message,
						status: 'success',
						pos: 'top-center',
						timeout: 10000
					})
					this.cleanMedicine()
				}, response=> {
					if(response.status == 401) {
						this.pageLoading = false
						// user is not recognized as a human
						this.requestCaptcha()
					} else if(response.status != 200) {
						this.pageLoading = false
						// an error has occured
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
			cleanMedicine() {
				this.latinName = ""
				this.arabicName = ""
				$('#expire-date').val("")
				this.packageState = ""
				this.governorate = ""
				this.notes = ""
			}	
		},
		watch: {
			/*
			 *	Monitor the changes in those fields
			 */
			latinName: function() {
				this.validateLatinName()	
			},
			arabicName: function() {
				this.validateArabicName()
			},
			packageState: function() {
				this.validatePackageState()
			},
			governorate: function() {
				this.validateGovernorate()
			},
			username: function() {
				this.validateUsername()
			},
			email: function() {
				this.validateEmail()
			},
			phone: function() {
				this.validatePhone()
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
		},
		mounted() {
			this.cleanErrorFlags()
		}
	}
</script>

<style>
	.page-wrapper {
		padding: 40px;
	}
	.tabs-wrapper {
		margin-top: 30px;
	}

	.tab-toggle {
		width: 240px;
	}	
	.uk-tab a {
		color: rgba(0,0,0,0.57);
	}

	.uk-tab a:hover, .uk-tab>.uk-active>a {
		color: #e84c3d;
	}

	.uk-tab>.uk-active>a {
		border-color: #e84c3d;
	}
	.tabs-wrapper .uk-input, .tabs-wrapper .uk-textarea {
		width: 640px;
	}
	.tabs-wrapper .uk-select {
		width: 500px;
	}
	.datepicker--nav-action {
		-webkit-transform: rotateY(180deg); /* Safari */
	    transform: rotateY(180deg);
	}

	.captcha-container {
		padding: 20px;
		background-color: #333;
		color: #fff;
		text-align: center;
		position: fixed;
		top: 20vh;
		left: 20%;
		right: 20%;
		max-width: 960px;
		box-shadow: 1px 1px 10px #333;
	}

	.captcha-data {
		margin-bottom: 20px; 
	}
	
	.captcha-container input {
		margin-right: 20px;
		width: 200px;
	}
	.captcha-container button {
		padding: 5px;
		font-size: 1rem;
		cursor: pointer;
	}
	@media screen and (max-width: 640px) {
		.page-wrapper {
			padding: 70px 20px;
		}
		.tabs-wrapper {
			margin-top: -30px;
		}
		.tabs-wrapper .uk-input, .tabs-wrapper .uk-textarea {
			font-size: 0.8rem;
			min-width: 300px;
			width: 640px;
		}
		.tabs-wrapper .uk-select {
			width: 100%;
		}

		.captcha-container {
			left: 10%;
			right: 10%;
		}
		.captcha-container input {
			height: 30px;
			margin-right: 20px;
			margin-top: 20px;
		}
		.captcha-container button {
			padding: 8px;
			margin-top: 20px;
		}
	}

	/* responsive form grid */
	.uk-form-controls {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.form-error {
		color: red;
		margin-top: 8px;
		margin-right: 20px; 
	}
	@media screen and (max-width: 960px) {
		.uk-form-controls {
			flex-direction: column;
		}
		.form-error {
			font-size: 0.8rem;
			margin-right: 0; 
		}
	}

	/* spinner styles */
	.uk-spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		right: 50%;
		color: #e84c3d;

	}
</style>