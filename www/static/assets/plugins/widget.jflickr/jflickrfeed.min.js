/*
* Copyright (C) 2009 Joel Sutherland
* Licenced under the MIT license
* http://www.newmediacampaigns.com/page/jquery-flickr-plugin
*
* Available tags for templates:
* title, link, date_taken, description, published, author, author_id, tags, image*
*/
!function(e){e.fn.jflickrfeed=function(i,a){i=e.extend(!0,{flickrbase:"http://api.flickr.com/services/feeds/",feedapi:"photos_public.gne",limit:20,qstrings:{lang:"en-us",format:"json",jsoncallback:"?"},cleanDescription:!0,useTemplate:!0,itemTemplate:"",itemCallback:function(){}},i);var t=i.flickrbase+i.feedapi+"?",c=!0;for(var n in i.qstrings)c||(t+="&"),t+=n+"="+i.qstrings[n],c=!1;return e(this).each(function(){var c=e(this),n=this;e.getJSON(t,function(t){e.each(t.items,function(e,a){if(e<i.limit){if(i.cleanDescription){var t=/<p>(.*?)<\/p>/g,m=a.description;t.test(m)&&(a.description=m.match(t)[2],void 0!=a.description&&(a.description=a.description.replace("<p>","").replace("</p>","")))}if(a.image_s=a.media.m.replace("_m","_s"),a.image_t=a.media.m.replace("_m","_t"),a.image_m=a.media.m.replace("_m","_m"),a.image=a.media.m.replace("_m",""),a.image_b=a.media.m.replace("_m","_b"),delete a.media,i.useTemplate){var r=i.itemTemplate;for(var l in a){var p=new RegExp("{{"+l+"}}","g");r=r.replace(p,a[l])}c.append(r)}i.itemCallback.call(n,a)}}),e.isFunction(a)&&a.call(n,t)})})}}(jQuery);
