/** ********************************************** **
	@Author			Dorin Grigoras
	@Website		www.stepofweb.com
	@Last Update	Monday, July 21, 2014
 ** ********************************************* **/
 
 
 
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(e){var a=/\+/g;function d(g){return g}function b(g){return decodeURIComponent(g.replace(a," "))}function f(g){if(g.indexOf('"')===0){g=g.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return c.json?JSON.parse(g):g}catch(h){}}var c=e.cookie=function(p,o,u){if(o!==undefined){u=e.extend({},c.defaults,u);if(typeof u.expires==="number"){var q=u.expires,s=u.expires=new Date();s.setDate(s.getDate()+q)}o=c.json?JSON.stringify(o):String(o);return(document.cookie=[encodeURIComponent(p),"=",c.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join(""))}var g=c.raw?d:b;var r=document.cookie.split("; ");var v=p?undefined:{};for(var n=0,k=r.length;n<k;n++){var m=r[n].split("=");var h=g(m.shift());var j=g(m.join("="));if(p&&p===h){v=f(j);break}if(!p){v[h]=f(j)}}return v};c.defaults={};e.removeCookie=function(h,g){if(e.cookie(h)!==undefined){e.cookie(h,"",e.extend(g,{expires:-1}));return true}return false}}));



/**	STYLE SWITCHER
*************************************************** **/
jQuery(document).ready(function() {
	"use strict";

		var _sw = '<!-- STYLESWITCHER - REMOVE ON PRODUCTION/DEVELOPMENT -->'
				+ '<div id="switcher" class="hide hidden-xs">'
				+ '	<div class="content-switcher">'
				+ '		<h4>STYLE SWITCHER</h4>'

				+ '		<ul class="list-unstyled">'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'green\'); return false;" title="green" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/6.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'red\'); return false;" title="red" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/2.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'orange\'); return false;" title="orange" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/1.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'pink\'); return false;" title="pink" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/3.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'yellow\'); return false;" title="yellow" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/4.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'darkgreen\'); return false;" title="darkgreen" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/5.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'darkblue\'); return false;" title="darkblue" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/7.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'blue\'); return false;" title="blue" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/8.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'brown\'); return false;" title="brown" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/9.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'lightgrey\'); return false;" title="lightgrey" class="color"><img src="/static/assets/plugins/styleswitcher/color_schemes/10.png" alt="" width="30" height="30" /></a></li>'
				+ '		</ul>'

				+ '		<div class="margin-top-10 text-left">'

				+ '			<div class="clearfix">'
				+ '				<label><input class="dark_switch" type="radio" name="color_skin" id="is_light" value="light" checked="checked" /> Light</label>'
				+ '				<label><input class="dark_switch" type="radio" name="color_skin" id="is_dark" value="dark" /> Dark <!--<small class="fsize11 styleColor">(BETA)</small>--></label>'
				+ '			</div>'

				+ '			<hr class="hidden-xs" />'

				+ '			<div class="clearfix hidden-xs">'
				+ '				<label><input class="boxed_switch" type="radio" name="layout_style" id="is_wide" value="wide" checked="checked" /> Wide</label>'
				+ '				<label><input class="boxed_switch" type="radio" name="layout_style" id="is_boxed" value="boxed" /> Boxed</label>'
				+ '			</div>'

				+ '			<hr />'

				+ '			<div class="clearfix">'
				+ '				<label><input class="rtl_switch" type="radio" name="layout_rtl" id="is_ltr" value="ltr" checked="checked" /> LTR</label>'
				+ '				<label><input class="rtl_switch" type="radio" name="layout_rtl" id="is_rtl" value="rtl" /> RTL</label>'
				+ '			</div>'

				+ '		</div>'

				+ '		<p class="nomargin-bottom">Patterns for Boxed Version</p>'
				+ '		<div>'
				+ '			<button onclick="pattern_switch(\'none\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/none.jpg" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern2\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern2.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern3\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern3.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern4\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern4.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern5\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern5.png" width="27" height="27" alt="" /></button>'
				+ '		</div>'

				+ '		<div>'
				+ '			<button onclick="pattern_switch(\'pattern6\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern6.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern7\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern7.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern8\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern8.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern9\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern9.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern10\');" class="pointer switcher_thumb"><img src="/static/assets/images/patterns/pattern10.png" width="27" height="27" alt="" /></button>'
				+ '		</div>'

				+ '		<p class="nomargin-bottom">Images for Boxed Version</p>'
				+ '		<button onclick="background_switch(\'none\');" class="pointer switcher_thumb"><img src="/static/assets/images/demo/boxed_background/none.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'/static/assets/images/demo/boxed_background/1.jpg\');" class="pointer switcher_thumb"><img src="/static/assets/images/demo/boxed_background/1_thumb.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'/static/assets/images/demo/boxed_background/2.jpg\');" class="pointer switcher_thumb"><img src="/static/assets/images/demo/boxed_background/2_thumb.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'/static/assets/images/demo/boxed_background/3.jpg\');" class="pointer switcher_thumb"><img src="/static/assets/images/demo/boxed_background/3_thumb.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'/static/assets/images/demo/boxed_background/4.jpg\');" class="pointer switcher_thumb"><img src="/static/assets/images/demo/boxed_background/4_thumb.jpg" width="27" height="27" alt="" /></button>'

				+ '		<hr />'

				+ '		<div class="text-center">'
				+ '			<button onclick="resetSwitcher();" class="btn btn-primary btn-sm">Reset Styles</button>'
				+ '		</div>'

				+ '		<div id="hideSwitcher">&times;</div>'
				+ '	</div>'
				+ '</div>'

				+ '<div id="showSwitcher" class="styleSecondColor hide hidden-xs"><i class="fa fa-flask styleColor"></i></div>'
				+ '<!-- /STYLESWITCHER -->';

	// ADD CLASS
	jQuery("head").append('<link href="/static/assets/plugins/styleswitcher/styleswitcher.css" rel="stylesheet" type="text/css" />');
	jQuery("body").append(_sw);
	jQuery("#switcher, #showSwitcher").removeClass('hide');

    jQuery("#hideSwitcher, #showSwitcher").click(function () {

        if (jQuery("#showSwitcher").is(":visible")) {

			var _identifier = "#showSwitcher";
            jQuery("#switcher").animate({"margin-left": "0px"}, 500).show();
			createCookie("switcher_visible", 'true', 365);

        } else {

			var _identifier = "#switcher";
            jQuery("#showSwitcher").show().animate({"margin-left": "0"}, 500);
			createCookie("switcher_visible", 'false', 365);

        }

		jQuery(_identifier).animate({"margin-left": "-500px"}, 500, function () {
			jQuery(this).hide();
		});

    });


	/**
		COLOR SKIN [light|dark]
	**/
	jQuery("input.dark_switch").bind("click", function() {
		var color_skin = jQuery(this).attr('value');

		if(color_skin == 'dark') {
			jQuery("#css_dark_skin").remove();
			jQuery("head").append('<link id="css_dark_skin" href="/static/assets/css/layout-dark.css" rel="stylesheet" type="text/css" title="dark" />');
			createCookie("color_skin", 'dark', 365);
			jQuery("a.logo img").attr('src', '/static/assets/images/logo_light.png');
		} else {
			jQuery("#css_dark_skin").remove();
			createCookie("color_skin", '', -1);
			jQuery("a.logo img").attr('src', '/static/assets/images/logo_dark.png');
		}
	});



	/**
		RTL|LTR
	**/
	jQuery("input.rtl_switch").bind("click", function() {
		var _direction = jQuery(this).attr('value');

		if(_direction == 'rtl') {
			jQuery("#rtl_ltr").remove();
			jQuery("#rtl_ltr_b1").remove();
			jQuery("#rtl_ltr_b2").remove();

			jQuery("head").append('<link href="/static/assets/plugins/bootstrap/RTL/bootstrap-rtl.min.css" rel="stylesheet" type="text/css" id="rtl_ltr_b1" />');
			jQuery("head").append('<link href="/static/assets/plugins/bootstrap/RTL/bootstrap-flipped.min.css" rel="stylesheet" type="text/css" id="rtl_ltr_b2" />');
			jQuery("head").append('<link href="/static/assets/css/layout-RTL.css" rel="stylesheet" type="text/css" id="rtl_ltr" />');

			createCookie("_direction", 'rtl', 365);
		} else {
			jQuery("#rtl_ltr").remove();
			jQuery("#rtl_ltr_b1").remove();
			jQuery("#rtl_ltr_b2").remove();

			createCookie("_direction", '', -1);
		}
	});


	/**
		LAYOUT STYLE [wide|boxed]
	**/
	jQuery("input.boxed_switch").bind("click", function() {
		var boxed_switch = jQuery(this).attr('value');

		if(boxed_switch == 'boxed') {
			jQuery("body").removeClass('boxed');
			jQuery("body").addClass('boxed');
			createCookie("is_boxed", 'true', 365);
		} else {
			jQuery("body").removeClass('boxed');
			createCookie("is_boxed", '', -1);
			jQuery('body').removeClass('transparent');
		}

		/* 
			IE Fix - boxed & sticky header 
			@Styleswitcher bug only.
		*/
		if(jQuery('html').hasClass('ie')) {
			jQuery(window).scroll(function() {
				if(jQuery('body').hasClass('boxed')) {
					jQuery("#header").removeClass('sticky');
					jQuery("#header").removeClass('affix');
				}
			});
		}

	});


});



	/** ********************************************************************************************************** **/
	/** ********************************************************************************************************** **/
	/** ********************************************************************************************************** **/
	function setActiveStyleSheet(title) {
		if(title != 'null' && title != null) {
			jQuery("#color_scheme").attr('href', '/static/assets/css/color_scheme/' + title + '.css');
			if(jQuery("#css_dark_skin").length < 1) {
				// jQuery("a.logo img").attr('src', '/static/assets/images/demo/logo/' + title + '.png');
			}
			createCookie("style", title, 365);


			// DARK SKIN
			/**
			var color_skin = readCookie('color_skin');
			if(color_skin == 'dark') {
				jQuery("#css_dark_skin").remove();
				jQuery("head").append('<link id="css_dark_skin" href="/static/assets/css/layout-dark.css" rel="stylesheet" type="text/css" title="dark" />');
				jQuery("#is_dark").trigger('click');
				jQuery("a.logo img").attr('src', '/static/assets/images/logo_dark.png');
			}
			**/
		}
	}

	function getActiveStyleSheet() {

		return null;
	}

	function getPreferredStyleSheet() {
		var i, a;
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
			if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) { 
				return a.getAttribute("title"); 
			}
		}

		return null;
	}

	function createCookie(name,value,days) {
		/** 
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			expires = "";
		}	document.cookie = name+"="+value+expires+"; path=/";
		**/
	}

	function readCookie(name) {
		/** 
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];

			while (c.charAt(0)==' ') {
				c = c.substring(1,c.length);
			}

			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		**/

		return null;
	}

	jQuery("select#headerLayout").click(function() {

		var type = jQuery(this).attr('value');

		if (jQuery("#css_navigation_style").length > 0){
			jQuery("#css_navigation_style").remove();
		}

		jQuery("head").append("<link>");
		jQuery("head").children(":last").attr({
			rel:  	"stylesheet",
			type: 	"text/css",
			id: 	"css_navigation_style",
			href: 	"css/navigation-style-" + type + ".css"
		});

	});


	/**
		Pattern Background
	**/
	function pattern_switch(pattern) {
		if(pattern == 'none' || pattern == '') {
			createCookie("pattern_switch", pattern, -1);
			remove_pattern();
		} else {

			if(!jQuery('body').hasClass('boxed')) {
				jQuery('body').addClass('boxed');
				jQuery("#is_boxed").trigger('click');
				createCookie("is_boxed", 'true', 365);
			}

			createCookie("background_switch", '', -1);
			jQuery('body').attr('data-background', '');
			jQuery('.backstretch').remove();
			jQuery('body').removeClass('transparent');
			remove_pattern();

			remove_pattern();
			jQuery('body').addClass(pattern);
			createCookie("pattern_switch", pattern, 365);
		}
	}
	function remove_pattern() {
		jQuery('body').removeClass('pattern1');
		jQuery('body').removeClass('pattern2');
		jQuery('body').removeClass('pattern3');
		jQuery('body').removeClass('pattern4');
		jQuery('body').removeClass('pattern5');
		jQuery('body').removeClass('pattern6');
		jQuery('body').removeClass('pattern7');
		jQuery('body').removeClass('pattern8');
		jQuery('body').removeClass('pattern9');
		jQuery('body').removeClass('pattern10');
		createCookie("pattern_switch", '', -1);
	}



	/**
		Image Background
	**/
	function background_switch(imgbkg) {
		if(imgbkg == 'none' || imgbkg == '') {

			createCookie("background_switch", '', -1);
			jQuery('body').attr('data-background', '');
			jQuery('.backstretch').remove();
			jQuery('body').removeClass('transparent');
			remove_pattern();

		} else {

			if(!jQuery('body').hasClass('boxed')) {
				jQuery('body').addClass('boxed');
				jQuery("#is_boxed").trigger('click');
				createCookie("is_boxed", 'true', 365);
			}

			jQuery('body').attr('data-background', imgbkg);
			createCookie("background_switch", imgbkg, 365);
			remove_pattern();

			var data_background = jQuery('body').attr('data-background');
			if(data_background) {

				loadScript(plugin_path + 'jquery.backstretch.min.js', function() {

					if(data_background) {
						jQuery.backstretch(data_background);
						jQuery('body').addClass('transparent'); // remove backround color of boxed class
					}

				});

			}
		}
	}



	/**
		Reset Switcher
	**/
	function resetSwitcher() {
		remove_pattern();
		jQuery('body').removeClass('boxed');
		jQuery("#css_dark_skin").remove();
		jQuery('body').attr('data-background', '');
		jQuery('.backstretch').remove();
		jQuery("a.logo img").attr('src', '/static/assets/images/logo.png');

		jQuery("#is_light").trigger('click');
		jQuery("#is_wide").trigger('click');
		jQuery("#is_ltr").trigger('click');

		// delete cookies!
		createCookie("style", '', -1);
		createCookie("switcher_visible", '', -1);
		createCookie("pattern_switch", '', -1);
		createCookie("background_switch", '', -1);
		createCookie("boxed", '', -1);
		createCookie("color_skin", '', -1);
		createCookie("is_boxed", '', -1);
	}
