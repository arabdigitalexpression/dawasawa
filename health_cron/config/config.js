let Config = {};

Config.NAME = "Healtcheck";
Config.VERSION = "1.0.0";

Config.SERVICES = [
	{ name: "app_server", ip: "http://localhost:3000", cmd: ""},
	{ name: "captcha_server", ip: "http://localhost:4000", cmd: ""},
	{ name: "email_server", ip: "http://localhost:5000", cmd: ""}
]

Config.MINUTE = 10 // minutes

module.exports = Config;