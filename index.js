#!/usr/bin/env node
 
let program = require('commander');
let http = require('http');
let querystring = require('querystring');
let crypto=require('crypto');

let appId = '03c86605ee56de31';
let appKey = 'ASnBvRUIZW8YQoVFQD4hyP6TOLrn62KK';
let cmdValue = undefined;

let getMd5 = (key) => {
	let md5=crypto.createHash("md5");
	md5.update(key);
	let str=md5.digest('hex');
	let s=str.toUpperCase();  
	return s;
}

let getSalt = () => {
	return Math.round(Math.random()*100000000000);
}

let trans = (q, to) => {
	let salt = getSalt();
	let contents = querystring.stringify({
	    q: q,
	    from: 'auto',
	    to: to,
	    appKey: appId,
	    salt: salt,
	    sign: getMd5(appId + q + salt + appKey),
	});

	let options = {
	    host:'openapi.youdao.com',
	    path:'/api',
	    method:'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded',
	        'Content-Length':contents.length
	    }
	}

    let req = http.request(options, function(res){
	    res.setEncoding('utf8');
	    res.on('data',function(data){
	    	let datas = JSON.parse(data);
	    	let phonetic = datas.basic&&datas.basic.phonetic ? "["+datas.basic.phonetic+"]" : '';
	        console.log(datas.query + phonetic);
			console.log('翻译：');
			console.log(datas.translation);
			datas.basic&&datas.basic.explains.map((item)=>console.log('  ' + item));
	    });
	});

	req.on('error', function (e) { 
		console.log('抱歉，出了点小问题'); 
	});

  req.write(contents);
	req.end();
}

let getCountry = (option) => {
  if(option.en)
    toLanguage = 'En'
  else if(option.ja) 
    toLanguage = 'ja'
  else if(option.zh) 
    toLanguage = 'zh-CHS'
  else if(option.ko) 
    toLanguage = 'ko'
  else if(option.fr) 
    toLanguage = 'fr'
  else if(option.ru)
    toLanguage = 'ru'
  else if(option.pt) 
    toLanguage = 'pt'
  else if(option.es)
    toLanguage = 'es'
  else if(option.vi)
    toLanguage = 'vi'
  else 
    toLanguage = 'auto'

  return toLanguage;
}
 
program
  .version('0.0.8')
  .arguments('<cmd>')
  .option("-z, --zh","to Chinese（中文）")
  .option("-e, --en","to English（英文）")  
  .option("-j, --ja", "to Japanese（日语）")
  .option("-k, --ko", "to Korean（韩语）")
  .option("-f, --fr", "to French（法语）")
  .option("-r, --ru", "to Russian（俄语）")
  .option("-p, --pt", "to Portuguese（葡萄牙语）")
  .option("-x, --es", "to Spanish（西班牙语）")
  .option("-v, --vi", "to Vietnamese（越南语）")
  .action((cmd, options)=>{
    cmdValue = cmd;
    to = getCountry(options);
  });

program.parse(process.argv);

if(cmdValue === undefined) {
	console.error('input the word you want to trans');
	process.exit(1);
} else {
	trans(cmdValue, to);
}