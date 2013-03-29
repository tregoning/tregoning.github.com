(function(){
	var html5Tags = ["section","nav","article","aside","hgroup","header","footer","main","figure","figcaption","time"],
		tag;
	for(tag in html5Tags){
		document.createElement(html5Tags[tag]);
	}
}());