/*Organización del trabajo.
Primero Filtrar post inde

*/


const request= require('request')
const cheerio = require('cheerio')

//var url = `http://foro.rava.com/foro3/search.php?st=1&sk=t&sd=d&sr=posts&t=77&author_id=2143&ch=-1` //semanal
var url = `http://foro.rava.com/foro3/search.php?t=77&author_id=2143&start=START`


function getposts(start,cb){
	url=url.replace("START",start)
	var posts = []
	request.get(url,function(err,res,body){
	$=cheerio.load(body)
	var post = $(".content")
	//console.log(post.length)
	for(var i=0;i<post.length;i++){
		posts.push(Object.values(post[i].children).map(a=>a.name=="img"?a.attribs.title:"0").filter(a=>a!="0"))
	}
	cb(posts)	
	})
}


function getpapucastico(cb){
	var arriba =0
	var abajo =0
	getposts(0,x=>{
	for(var o of x){
		for (var a of o){
			if (a=="Arriba")arriba++
			if (a=="Abajo")abajo++
		}
	}
	cb((abajo-arriba)/(arriba+abajo)*100)	
	})
}



/* Obtiene la cantidad de post creados de un usuario en un topic.
 @param: {number}: Numero de post en un topic de un usuario.
*/
function getpostcount(cb){
	request.get(url,function(err,res,body){
	$=cheerio.load(body)
	cb($(".searchresults-title").text().split(" ")[2]*1)
	})
}

module.exports ={getpapucastico}



