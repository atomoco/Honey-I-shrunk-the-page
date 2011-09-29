/* Out of Body */

function HISTPInit () {

	// id the browser doesn't support transforms, exit gracefully
	var testDiv = document.createElement('div'),
		ret = false,
		properties = ['webkitTransform', 'MozTransform', 'msTransform', 'oTransform'];
	for (var i = properties.length - 1; i >= 0; i--){
		ret = ret ? ret : testDiv.style[properties[i]] != undefined;
	};
	if ( !ret ) {
		alert( 'Sorry, your browser doesn\'t appear support CSS transforms, so this favelet won\'t be of much use to you' );
		return;
	}

	// store the normal values for later
	if ( typeof(HISTPObj) == 'undefined' ) {
	
		HISTPObj = {}
		if ( document.body.style.webkitTransform != undefined ) {
			HISTPObj.oldTransform = document.body.style.webkitTransform;
		} else if ( document.body.style.MozTransform != undefined ) {
			HISTPObj.oldTransform = document.body.style.MozTransform;
		} else if ( document.body.style.msTransform != undefined ) {
			HISTPObj.oldTransform = document.body.style.msTransform;
		} else if ( document.body.style.oTransform != undefined ) {
			HISTPObj.oldTransform = document.body.style.oTransform;
		}
		HISTPObj.oldOverflow = document.body.style.overflow;
		HISTPObj.oldHTMLBg = document.body.parentNode.style.background;
		HISTPObj.oldBodyBg = document.body.style.background;
		HISTPObj.oldBodyMinHeight = document.body.style.minHeight;
		HISTPObj.values = {}
		HISTPObj.values.scale = 0.5;
		HISTPObj.values.bodyColor = '';
		HISTPObj.values.htmlColor = '#cccccc';
		HISTPObj.values.anchor = '0%';
	
	}

	// if we're running, use click to remove everything
	if ( HISTPObj.running == 1 ) {
		HISTPClose();
		return;
	}
	
	// show that the dialog is on
	HISTPObj.running = 1;
	
	// set up the 
	var dialogDeadCentre = document.createElement('div');
	dialogDeadCentre.id = 'HISTP_dc';
	dialogDeadCentre.style.position = 'fixed';
	dialogDeadCentre.style.left = '50%';
	dialogDeadCentre.style.top = '50%';
	dialogDeadCentre.style.zIndex = 99999;
	dialogDeadCentre.style.width = 0;
	dialogDeadCentre.style.height = 0;
	
	var dialogContainer = document.createElement('div');
	dialogContainer.id = 'HISTP_container';
	dialogContainer.style.position = 'absolute';
	dialogContainer.style.left = '-100px';
	dialogContainer.style.top = '-100px';
	dialogContainer.style.width = '180px';
	dialogContainer.style.padding = '10px';
	dialogContainer.style.color = '#666';
	dialogContainer.style.background = '#ddd';
	dialogContainer.style.borderTop = '1px solid #fff';
	dialogContainer.style.borderLeft = '1px solid #fff';
	dialogContainer.style.borderBottom = '1px solid #bbb';
	dialogContainer.style.borderRight = '1px solid #bbb';
	dialogContainer.style.borderRadius = '5px';
	dialogContainer.style.opacity = '0';
	dialogContainer.style.webkitTransition = 'all 500ms';
	dialogContainer.style.webkitBoxShadow = '4px 4px 18px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.style.webkitTextShadow = '-1px -1px 1px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.style.MozTransition = 'all 500ms';
	dialogContainer.style.MozBoxShadow = '4px 4px 18px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.style.MozTextShadow = '-1px -1px 1px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.style.msTransition = 'all 500ms';
	dialogContainer.style.msBoxShadow = '4px 4px 18px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.style.msTextShadow = '-1px -1px 1px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.style.oTransition = 'all 500ms';
	dialogContainer.style.oBoxShadow = '4px 4px 18px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.style.oTextShadow = '-1px -1px 1px rgba( 0 , 0 , 0 , 0.6 )';
	dialogContainer.innerHTML = '<h3 style="display:block;font-family:\'gill sans\',arial,helvetica,sans-serif;font-size:16px;font-weight:normal;text-decoration:none;text-align:center;color:#333;margin:0;padding:0;letter-spacing:3px;line-height:120%;border:none;">HONEY I SHRUNK<div style="display:block;font-family:\'gill sans\',arial,helvetica,sans-serif;font-size:33px;font-weight:normal;text-decoration:none;text-align:center;color:#333;margin:0;padding:0;letter-spacing:3px;line-height:100%;border:none;">THE PAGE</div></h3>';
	dialogContainer.innerHTML += '<p style="display:block;margin:0 0 5px;padding:0;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;text-align:left;line-height:120%;">See whats going on outside of the viewport. Hover over the inputs for more info.</p>';
	dialogContainer.innerHTML += '<div style="display:block;clear:both;display:block;height:20px;margin:3px 0;padding:0;"><div style="display:block;float:left;width:80px;margin:3px 5px 0;padding:0;text-align:right;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;line-height:120%;">Scale</div><div style="display:block;float:left;margin:0;padding:0 0 0;"><input id="HISTP_val_scale" type="text" value="' + HISTPObj.values.scale + '" style="width:30px;margin:0;padding:2px;color:#333;background:#fff;border-radius:3px;border-width:1px;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;" title="enter the scale that you want the viewport to shrink to. \'1\' means no shrink, \'0.1\' means shrink to 10%" /></div></div>';
	dialogContainer.innerHTML += '<div style="display:block;clear:both;display:block;height:20px;margin:3px 0;padding:0;"><div style="display:block;float:left;width:80px;margin:3px 5px 0;padding:0;text-align:right;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;line-height:120%;">Body colour</div><div style="display:block;float:left;margin:0;padding:0 0 0;"><input id="HISTP_val_body_color" type="text" value="' + HISTPObj.values.bodyColor + '" style="width:80px;margin:0;padding:2px;color:#333;background:#fff;border-radius:3px;border-width:1px;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;" title="enter the background colour you want to set the <body> tag as when the viewport is shrunk. If empty, the body colour does not change." /></div></div>';
	dialogContainer.innerHTML += '<div style="display:block;clear:both;display:block;height:20px;margin:3px 0;padding:0;"><div style="display:block;float:left;width:80px;margin:3px 5px 0;padding:0;text-align:right;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;line-height:120%;">Window colour</div><div style="display:block;float:left;margin:0;padding:0 0 0;"><input id="HISTP_val_html_color" type="text" value="' + HISTPObj.values.htmlColor + '" style="width:80px;margin:0;padding:2px;color:#333;background:#fff;border-radius:3px;border-width:1px;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;" title="enter the background colour you want to set the <html> tag as when the viewport is shrunk (so you can see where the viewport is). If empty, the body colour does not change." /></div></div>';
	dialogContainer.innerHTML += '<div style="display:block;clear:both;display:block;height:20px;margin:3px 0;padding:0;"><div style="display:block;float:left;width:80px;margin:3px 5px 0;padding:0;text-align:right;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;line-height:120%;">Anchor</div><div style="display:block;float:left;margin:0;padding:0 0 0;"><select id="HISTP_val_anchor" style="width:80px;margin:0;padding:2px;color:#333;background:#fff;border-radius:3px;border-width:1px;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;" title="When shrunk, anchor the view to the top (best for long scrolling pages) or the middle (best for short/fixed height pages)" /><option value="0%"' + ( HISTPObj.values.anchor == '0%' ? ' selected="selected"' : '' ) + '>Top</option><option value="50%"' + ( HISTPObj.values.anchor == '50%' ? ' selected="selected"' : '' ) + '>Middle</option></select></div></div>';
	dialogContainer.innerHTML += '<div style="display:block;clear:both;display:block;height:20px;margin:3px 0;padding:0;"><div style="display:block;float:left;width:80px;margin:0 5px 0;padding:0;text-align:right;"><input type="button" value="cancel" style="width:60px;margin:0;padding:2px;color:#999;background:#eee;border-radius:3px;border-width:1px;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;" onclick="HISTPClose()" /></div><div style="display:block;float:left;margin:0;padding:0 0 0;"><input type="submit" value="-- go --" style="width:60px;margin:0;padding:2px;color:#333;background:#ccc;border-radius:3px;border-width:1px;font-family:\'lucida grande\',arial,helvetica,sans-serif;font-size:11px;font-weight:normal;text-decoration:none;" onclick="HISTPProcess()" /></div></div>';
	
	dialogDeadCentre.appendChild(dialogContainer);
	document.body.appendChild(dialogDeadCentre);
	
	setTimeout( function () {
		dialogContainer.style.opacity = '1';
	} );

}

function HISTPCloseDialog () {
	
	if ( document.getElementById( 'HISTP_dc' ) == null ) {
		return;
	}

	var dialogDeadCentre = document.getElementById( 'HISTP_dc' );
	var dialogContainer = document.getElementById( 'HISTP_container' );

	dialogContainer.style.opacity = '0';

	setTimeout( function () {
	
		if ( dialogDeadCentre != undefined ) {
			dialogDeadCentre.parentNode.removeChild( dialogDeadCentre )
		}
		
	} , 500 );
}

function HISTPClose () {

	HISTPCloseDialog ();
	
	HISTPGo ( '' , '' , 1 );

	HISTPObj.running = 0;

}

function HISTPProcess () {

	var HISTPValScale = document.getElementById( 'HISTP_val_scale' ).value;
	var HISTPValBodyColor = document.getElementById( 'HISTP_val_body_color' ).value;
	var HISTPValHtmlColor = document.getElementById( 'HISTP_val_html_color' ).value;
	var HISTPValAnchor = document.getElementById( 'HISTP_val_anchor' ).value;
	
	HISTPObj.values.scale = HISTPValScale;
	HISTPObj.values.bodyColor = HISTPValBodyColor;
	HISTPObj.values.htmlColor = HISTPValHtmlColor;
	HISTPObj.values.anchor = HISTPValAnchor;
		
	HISTPCloseDialog ();
	
	setTimeout( function () {
		HISTPGo ( HISTPValHtmlColor , HISTPValBodyColor , HISTPValScale , HISTPValAnchor );
	} , 500 );

}

function HISTPGo ( htmlColor , bgColor , scale , anchor ) {

	// defaults
	if ( htmlColor == 'null' ) {
		htmlColor = '';
	}
	if ( bgColor == 'null' ) {
		bgColor = '';
	}
	if ( scale == undefined || scale == 'null' ) {
		scale = '0.5';
	}
	if ( anchor == 'null' ) {
		anchor = '0%';
	}
	
	// set the transition to make it smooth
	document.body.style.webkitTransition = '-webkit-transform 500ms';
	document.body.style.webkitBoxShadow = '4px 4px 24px rgba( 0 , 0 , 0 , 0.8 )';
	document.body.style.MozTransition = '-webkit-transform 500ms';
	document.body.style.MozBoxShadow = '4px 4px 24px rgba( 0 , 0 , 0 , 0.8 )';
	document.body.style.msTransition = '-webkit-transform 500ms';
	document.body.style.msBoxShadow = '4px 4px 24px rgba( 0 , 0 , 0 , 0.8 )';
	document.body.style.oTransition = '-webkit-transform 500ms';
	document.body.style.oBoxShadow = '4px 4px 24px rgba( 0 , 0 , 0 , 0.8 )';
	// zoom back to normal
	if ( scale == '1' ) {
	
		document.body.style.minHeight = HISTPObj.oldBodyMinHeight;
		document.body.style.overflow = HISTPObj.oldOverflow;
		document.body.style.webkitTransform = HISTPObj.oldTransform;
		document.body.style.MozTransform = HISTPObj.oldTransform;
		document.body.style.msTransform = HISTPObj.oldTransform;
		if ( htmlColor != undefined ) {
			document.body.parentNode.style.background = HISTPObj.oldHTMLBg;
		}
		if ( bgColor != undefined ) {
			document.body.style.background = HISTPObj.oldBodyBg;
		}
		setTimeout( function () {
			document.body.style.webkitTransformOrigin = '';
		} , 500 );
	// zoom out of body
	} else {
	
		document.body.style.minHeight = '100%';
		document.body.style.overflow = 'visible';
		document.body.style.webkitTransformOrigin = '50% ' + anchor;
		document.body.style.MozTransformOrigin = '50% ' + anchor;
		document.body.style.msTransformOrigin = '50% ' + anchor;
		document.body.style.oTransformOrigin = '50% ' + anchor;
		document.body.style.webkitTransform = 'scale(' + scale + ') translateZ(0)';
		document.body.style.MozTransform = 'scale(' + scale + ')';
		document.body.style.msTransform = 'scale(' + scale + ')';
		document.body.style.oTransform = 'scale(' + scale + ')';
		if ( htmlColor != undefined ) {
			document.body.parentNode.style.background = htmlColor;
		}
		if ( bgColor != undefined ) {
			document.body.style.background = bgColor;
		}
	}

}

// Run the whole thing

HISTPInit();