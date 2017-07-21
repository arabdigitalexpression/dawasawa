const request = require('request');
const schedule = require('node-schedule');
const async = require('async');
const exec = require('child_process').exec;
const Config = require('./config/config');

schedule.scheduleJob( `*/${Config.MINUTE} * * * * *`, function(){
	//console.log(new Date);
	async.each(Config.SERVICES, (service, callback) => {	
		request
			.get(`${service.ip}/heartbeat`)
			.on('error', (err) => {
				console.log(service.name, 'stopped working')
				exec(service.cmd, (err, stdout, stderr) => {
					if(err){
						console.error(`exec error: ${err}`);
			    		return;
					}
					console.log(`stdout: ${stdout}`);
					console.log(`stderr: ${stderr}`);
				})
			})
			.on('response', (response) => {
				console.log(service.name, response.statusCode)
			})
	})
})

