$(document).ready(function() {
  (function(doc, script) {
    var js, id;
    fjs = doc.getElementsByTagName(script)[0],
    frag = doc.createDocumentFragment(),
    add = function(url, id) {
      if (doc.getElementById(id)) {return;}
        js = doc.createElement(script);
        js.src = url;
        id && (js.id = id);
        frag.appendChild( js );
      }

      // Google+ button
      add('http://apis.google.com/js/plusone.js');
      // Facebook SDK
      add('//connect.facebook.net/en_US/all.js#xfbml=1&appId=200103733347528', 'facebook-jssdk');
      // Twitter SDK
      add('//platform.twitter.com/widgets.js');

      fjs.parentNode.insertBefore(frag, fjs);
    }(document, 'script'));

  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps);
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
  });
});
