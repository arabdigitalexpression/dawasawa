let config = {}

// server config
config.NAME = "captcha server"
config.SITE_URL = "http://localhost"
config.PORT = 4000
config.VERSION = "1.0.0"

// email service url
config.EMAIL_SERVER_URL = "http://localhost:5000/"

// database config
config.DB_HOST = "mongodb://localhost"
config.DB_USER = ""
config.DB_PASS = ""
config.DB_PORT = "27017"
config.DB_NAME = "dawasawa"


// email config
config.EMAIL_FROM = ""				// sender email
config.EMAIL_TO = ""				// write us email
config.EMAIL_USER = ""				// email user
config.EMAIL_PASS = ""							// email password
config.EMAIL_SERVICE = "gmail" 								// development email
config.DKIM_PRIVATE_KEY = "" 								// production email
config.DKIM_KEY_SELECTOR = ""								// production email

// crypto config
config.ENCRYPTION_TYPE = "aes-128-gcm"
config.ENCRYPTION_SECRET = "ctIXAq9o3E81JWguImTDajqzk69LmYpUXIcyY3l+47Q" // Change in production

// application params
config.INSERTION_CHALLENGE_GRACE = "48" 		// (hours) the entry removed from the system if not confirmed in 48 hours.
config.LISTING_CHALLENGE_GRACE = "48" 			// (hours) the token link is not accepted after 48 hours
config.EXPIRY_REMOVAL_THRESHOLD = "30"			// (days)  entries are removed if it expires in 30 days


// captcha params
config.CAPTCHA_SIZE = "4" 	// nubmer of characters in captcha
config.CAPTCHA_NOISE = "2"	// number of noise lines in the captcha image
config.captcha_expiration_period = '1h' // The captcha expires after 1h


module.exports = config