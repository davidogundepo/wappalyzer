// Wappalyzer by ElbertF 2009 http://elbertf.com

var wappalyzer = {};

window.addEventListener('load',   function() { wappalyzer.init();       }, false);
window.addEventListener('unload', function() { wappalyzer.sendReport(); }, false);

wappalyzer =
{
	homeUrl:        'http://wappalyzer.com/',
	prevUrl:        '',
	regexDomain:    /^[a-z0-9._\-]+\.[a-z]+$/,
	appsDetected:   0,
	checkUnique:    [],
	currentTab:     false,
	lastHref:       '',
	prefs:          null,
	autoDetect:     true,
	enableTracking: true,
	newInstall:     false,
	showAppNames:   3,
	history:        [],
	hitCount:       0,
	isBookmarklet:  false,
	req:            false,

	app: [
		'phpBB',
		'WordPress',
		'MediaWiki',
		'Joomla',
		'Drupal',
		'Kolibri CMS',
		'vBulletin',
		'SMF',
		'IPB',
		'Coppermine',
		'MiniBB',
		'punBB',
		'XMB',
		'YaBB',
		's9y',
		'e107',
		'PHP-Fusion',
		'DokuWiki',
		'Squarespace',
		'MyBB',
		'FluxBB',
		'Vanilla',
		'TYPO3',
		'Prestashop',
		'Zen Cart',
		'osCommerce',
		'WikkaWiki',
		'osCSS',
		'Google Analytics',
		'Crazy Egg',
		'OneStat',
		'Clicky',
		'Quantcast',
		'StatCounter',
		'W3Counter',
		'Site Meter',
		'CubeCart',
		'jQuery',
		'MooTools',
		'Prototype',
		'MochiKit',
		'viennaCMS',
		'Movable Type',
		'Tumblr',
		'Google Friend Connect',
		'MyBlogLog',
		'Google Maps',
		'AWStats',
		'phpMyAdmin',
		'phpDocumentor',
		'BigDump',
		'MODx',
		'VP-ASP',
		'SPIP',
		'Plesk',
		'Magento',
		'DirectAdmin',
		'cPanel',
		'webEdition',
		'CMS Made Simple',
		'xtCommerce',
		'BIGACE',
		'Ubercart',
		'TYPOlight',
		'posterous',
		'papaya CMS',
		'eZ Publish',
		'script.aculo.us',
		'dojo',
		'ExtJS',
		'WebPublisher',
		'ConversionLab',
		'Koego',
		'YUI',
		'VisualPath',
		'WebGUI',
		'Plone',
		'CS Cart',
		'Web Optimizer',
		'K2',
		'AddThis',
		'Koobi',
		'XiTi',
		'Kampyle',
		'ClickTale',
		'Yahoo! Web Analytics',
		'XOOPS',
		'Amiro.CMS',
		'Blogger',
		'DataLife Engine',
		'Nedstat',
		'Microsoft ASP.NET',
		'Yandex.Metrika',
		'Snoobi',
		'Moogo',
		'Trac',
		'MantisBT',
		'Bugzilla',
		'Redmine',
		'2z Project',
		'Get Satisfaction',
		'Swiftlet',
		'YouTube',
		'Vimeo',
		'blip.tv',
		'SWFObject',
		'Textpattern CMS',
		'1C-Bitrix',
		'InstantCMS',
		'MaxSite CMS',
		'S.Builder',
		'openEngine',
		'SiteEdit',
		'Kentico CMS',
		'ShareThis',
		'chartbeat',
		'Meebo',
		'Gravity Insights',
		'Disqus',
		'reCAPTCHA',
		'DotNetNuke',
		'jQuery UI',
		'Typekit',
		'Mint',
		'cufon',
		'sIFR',
		'Mollom'
		],

	match: [
		/(Powered by (<a href=("|')[^>]+)?phpBB|<meta name=("|')copyright("|') [^>]+phpBB Group)/i,
		/(<link rel=("|')stylesheet("|') [^>]+wp-content|<meta name=("|')generator("|') [^>]+WordPress)/i,
		/(<meta name=("|')generator("|') [^>]+MediaWiki|<a[^>]+>Powered by MediaWiki<\/a>)/i,
		/<meta name=("|')generator("|') [^>]+Joomla/i,
		/(<script [^>]+drupal\.js|jQuery\.extend\(Drupal\.settings, \{|Drupal\.extend\(\{ settings: \{|<link[^>]+sites\/(default|all)\/themes\/|<style.+sites\/(default|all)\/(themes|modules)\/)/i,
		/<meta name=("|')copyright("|') [^>]+Kolibri/i,
		/<meta name=("|')generator("|') [^>]+vBulletin/i,
		/<script .+\s+var smf_/i,
		/<script [^>]+jscripts\/ips_/i,
		/<!--Coppermine Photo Gallery/i,
		/<a href=("|')[^>]+minibb.+\s+<!--End of copyright link/i,
		/Powered by <a href=("|')[^>]+punbb/i,
		/<!-- Powered by XMB/i,
		/Powered by <a href=("|')[^>]+yabbforum/i,
		/<meta name=("|')Powered-By("|') [^>]+Serendipity/i,
		/<script [^>]+e107\.js/i,
		/Powered by <a href=("|')[^>]+php-fusion/i,
		/<meta name=("|')generator("|') [^>]+DokuWiki/i,
		/Squarespace\.Constants\.CURRENT_MODULE_ID/i,
		/(<script .+\s+<!--\s+lang\.no_new_posts|<a[^>]* title=("|')Powered By MyBB)/i,
		/Powered by (<strong>)?<a href=("|')[^>]+fluxbb/i,
		/<body id=("|')DiscussionsPage("|')/i,
		/(<meta name=("|')generator("|') [^>]+TYPO3|<(script[^>]* src|link[^>]* href)=[^>]*fileadmin)/i,
		/Powered by <a href=("|')[^>]+PrestaShop/i,
		/<meta name=("|')generator("|') [^>]+Zen Cart/i,
		/<!-- header_eof \/\/-->/i,
		/(Powered by <a href=("|')[^>]+WikkaWiki|<meta name=("|')generator("|') [^>]+WikkaWiki)/i,
		/<body onload=("|')window\.defaultStatus='oscss templates';("|')/i,
		/(\.google\-analytics\.com\/ga\.js|<script src=("|')[^"]+google-analytics\.com\/urchin\.js("|'))/i,
		/<script type=("|')text\/javascript("|') src=("|')http:\/\/cetrk\.com\/pages\/scripts\/[0-9]+\/[0-9]+\.js("|')/,
		/var p=("|')http("|')\+\(d\.URL\.indexOf\('https:'\)==0\?'s':''\)\+("|'):\/\/stat\.onestat\.com\/stat\.aspx\?tagver/i,
		/<script src=("|')http:\/\/static\.getclicky\.com/i,
		/<script[^>]* src=("|')http:\/\/edge\.quantserve\.com\/quant\.js("|')>/i,
		/<script[^>]* src=("|')http:\/\/www\.statcounter\.com\/counter\/counter/i,
		/<script[^>]* src=("|')http:\/\/www\.w3counter\.com\/tracker\.js("|')>/i,
		/<script[^>]* src=("|')http:\/\/[^.]+\.sitemeter.com\/js\/counter\.js\?site=/i,
		/Powered by <a href=.http:\/\/www\.cubecart\.com/i,
		/<script[^>]* src=("|')[^>]*jquery[^>]*\.js/i,
		/<script[^>]* src=("|')[^>]*mootools[^>]*\.js("|')/i,
		/<script[^>]* src=("|')[^>]*prototype\.js("|')/i,
		/<script[^>]* src=("|')[^>]*MochiKit\.js/i,
		/powered by <a href=("|')[^>]+viennacms/i,
		/<meta name=("|')generator("|') [^>]+Movable Type/i,
		/<iframe src=("|')http:\/\/www\.tumblr\.com/i,
		/<script[^>]* src=("|')[^>]*google.com\/friendconnect/i,
		/<script[^>]* src=("|')[^>]*pub\.mybloglog\.com/i,
		/<script[^>]* src=("|')[^>]*maps\.google\.com\/maps\?file=api/i,
		/<meta name=("|')generator("|') [^>]+AWStats/i,
		/var pma_absolute_uri = '/i,
		/<!-- Generated by phpDocumentor/,
		/<!-- <h1>BigDump: Staggered MySQL Dump Importer/,
		/(<a[^>]+>Powered by MODx<\/a>|var el= \$\('modxhost'\);|<script type=("|')text\/javascript("|')>var MODX_MEDIA_PATH = "media";)/i,
		/(<a[^>]+>Powered By VP\-ASP Shopping Cart<\/a>|<script[^>]* src=("|')[^>]*vs350\.js)/,
		/<meta name=("|')generator("|') [^>]+SPIP/i,
		/<script[^>]* src=("|')[^>]*common\.js\?plesk/i,
		/var BLANK_URL = '[^>]+js\/blank\.html'/i,
		/<a[^>]+>DirectAdmin<\/a> Web Control Panel/i,
		/<!-- cPanel/i,
		/(<meta name=("|')generator("|') [^>]+webEdition|<meta name=("|')DC.title("|') [^>]+webEdition)/i,
		/<meta name=("|')generator("|') [^>]+CMS Made Simple/i,
		/(<meta name=("|')generator("|') [^>]+xt:Commerce|<div class=("|')copyright("|')>.+<a[^>]+>xt:Commerce)/i,
		/(<meta name=("|')generator("|') [^>]+BIGACE|Powered by <a href=("|')[^>]+BIGACE|<!--\s+Site is running BIGACE)/i,
		/<script[^>]* src=("|')[^>]*uc_cart\/uc_cart_block\.js/i,
		/(<!--\s+This website is powered by TYPOlight|<link[^>]+typolight.css)/i,
		/<div class=("|')posterous/i,
		/<link[^>]*\/papaya-themes\//i,
		/<meta name=("|')generator("|') [^>]+eZ Publish/i,
		/<script[^>]* src=("|')[^>]*scriptaculous\.js("|')/i,
		/<script[^>]* src=("|')[^>]*dojo(\.xd)?\.js("|')/i,
		/<script[^>]* src=("|')[^>]*ext\-base\.js("|')/i,
		/<meta name=("|')generator("|') [^>]+WEB\|Publisher/i,
		/<script[^>]* src=("|')http:\/\/conversionlab\.trackset\.com\/track\/tsend\.js("|')/,
		/<script[^>]* src=("|')http\:\/\/tracking\.koego\.com\/end\/ego\.js("|')/,
		/<script[^>]* src=("|')[^'"]*(\/yui\/|yui\.yahooapis\.com)[^'"]*("|')/,
		/<script[^>]* src=("|')http:\/\/visualpath[^\/]*\.trackset\.it\/[^\/]+\/track\/include\.js("|')/,
		/<meta name=("|')generator("|') [^>]+WebGUI/i,
		/<meta name=("|')generator("|') [^>]+Plone/i,
		/&nbsp;Powered by (<a href=.http:\/\/www\.cs\-cart\.com|CS\-Cart)/i,
		/<title [^>]*lang=("|')wo("|')>/,
		/<!-- JoomlaWorks "K2"/,
		/<script[^>]* src=("|')[^>]*addthis\.com\/js/,
		/<meta name=("|')generator("|') [^>]+Koobi/i,
		/<[^>]+src=("|')[^>]+xiti.com\/hit.xiti/i,
		/<script[^>]* src=("|')http:\/\/cf\.kampyle\.com\/k_button\.js("|')/,
		/if\(typeof ClickTale(Tag)*==("|')function("|')\)/,
		/<script[^>]* src=("|')[^>]*http:\/\/d\.yimg\.com\/mi\/ywa\.js/,
		/<meta name=("|')generator("|') [^>]+XOOPS/i,
		/<meta name=("|')generator("|') [^>]+Amiro/i,
		/<meta content=("|')blogger("|') [^>]+generator/i,
		/<meta name=("|')generator("|') [^>]+DataLife Engine/i,
		/sitestat\(("|')http:\/\/nl\.sitestat\.com/,
		/<input[^>]+name=("|')__VIEWSTATE/,
		/<script[^>]* src=("|')[^"']+mc\.yandex\.ru\/metrika\/watch\.js("|')/,
		/<script[^>]* src=("|')[^"']+snoobi\.com\/snoop\.php/,
		/<script[^>]* src=("|')[^"']+kotisivukone.js/,
		/(<a id=("|')tracpowered)/i,
		/<img[^>]+ alt=("|')Powered by Mantis Bugtracker/i,
		/<[^>]+(id|title|name)=("|')bugzilla/i,
		/(<meta name=("|')description("|')Redmine("|')|Powered by <a href=("|')[^>]+Redmine)/i,
		/<meta name=("|')generator("|') [^>]+2z project/i,
		/var feedback_widget = new GSFN\.feedback_widget\(feedback_widget_options\)/,
		/(<meta name=("|')generator("|') [^>]+Swiftlet|Powered by <a href=("|')[^>]+Swiftlet)/i,
		/<(param|embed)[^>]+youtube\.com\/v/i,
		/<(param|embed)[^>]+vimeo\.com\/moogaloop/i,
		/<(param|embed)[^>]+blip\.tv\/play/i,
		/<script[^>]+swfobject\.js/i,
		/<meta name=("|')generator("|') [^>]+Textpattern/i,
		/(<link[^>]+components\/bitrix|<script[^>]+1c\-bitrix)/i,
		/<meta name=("|')generator("|') [^>]+InstantCMS/i,
		/<meta name=("|')generator("|') [^>]+MaxSite CMS/i,
		/<meta name=("|')generator("|') [^>]+S\.Builder/i,
		/<meta[^>]+openEngine/i,
		/<meta name=("|')generator("|') [^>]+SiteEdit/i,
		/<meta name=("|')generator("|') [^>]+Kentico CMS/i,
		/<script[^>]+ src=("|')[^"']+w\.sharethis\.com\//i,
		/function loadChartbeat\(\) {/i,
		/(<iframe id=("|')meebo\-iframe("|')|Meebo\('domReady'\))/,
		/gravityInsightsParams\.site_guid = '/,
		/(<div[^>]+id=("|')disqus_thread("|')|<script[^>]+disqus_url)/,
		/(<div[^>]+id=("|')recaptcha_image|<script[^>]+ src=("|')https:\/\/api\-secure\.recaptcha\.net)/,
		/(<meta name=("|')generator("|') [^>]+DotNetNuke|<!\-\- by DotNetNuke Corporation)/i,
		/<script[^>]* src=("|')[^>]*jquery\-ui[^>]*\.js/i,
		/<script[^>]* src=("|')[^>]*use.typekit.com/i,
		/<script[^>]* src=("|')[^>]*mint\/\?js/i,
		/(<script[^>]* src=("|')[^>]*cufon\-yui\.js|<script[^>]*>[^<]+Cufon\.now\(\))/i,
		/<script[^>]* src=("|')[^>]*sifr\.js/i,
		/(<script[^>]* src=("|')[^>]*mollom\.js|<img[^>]+\/.mollom\/.com)/i
		],

	appDomain: [
		'Blogger',
		'TypePad',
		'LiveJournal',
		'Vox',
		'TYPO3'
		],

	matchDomain: [
		/(www.)?.+\.blogspot\.com$/i,
		/(www.)?.+\.typepad\.com$/i,
		/(www.)?.+\.livejournal\.com$/i,
		/(www.)?.+\.vox\.com$/i,
		/\/typo3/i
		],

	init: function() 
	{
		if ( wappalyzer.isBookmarklet )
		{
			return;
		}

		// Preferences		
		wappalyzer.prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService).getBranch('wappalyzer.');

		wappalyzer.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		wappalyzer.prefs.addObserver('', wappalyzer, false);

		wappalyzer.showAppNames   = wappalyzer.prefs.getIntPref( 'showAppNames');
		wappalyzer.autoDetect     = wappalyzer.prefs.getBoolPref('autoDetect');
		wappalyzer.enableTracking = wappalyzer.prefs.getBoolPref('enableTracking');
		wappalyzer.newInstall     = wappalyzer.prefs.getBoolPref('newInstall');

		// Open page after installation		
		if ( wappalyzer.newInstall )
		{
			wappalyzer.prefs.setBoolPref('newInstall', false);
			
			gBrowser.addEventListener('load', wappalyzer.installSuccess, false);
		}

		// Listen for URL changes
		gBrowser.addProgressListener(wappalyzer.urlChange, Components.interfaces.nsIWebProgress.NOTIFY_LOCATION);

		var appContent = document.getElementById('appcontent');

		if ( appContent )
		{
			appContent.addEventListener('DOMContentLoaded', wappalyzer.onPageLoad, true);
		}
	},

	observe: function(subject, topic, data)
	{
		if ( topic != 'nsPref:changed' )
		{
			return;
		}
		
		switch(data)
		{
			case 'autoDetect':
				wappalyzer.autoDetect     = wappalyzer.prefs.getBoolPref('autoDetect');
				
				break;
			case 'enableTracking':
				wappalyzer.enableTracking = wappalyzer.prefs.getBoolPref('enableTracking');
				
				break;
			case 'showAppNames':
				wappalyzer.showAppNames   = wappalyzer.prefs.getIntPref('showAppNames');
				
				break;
		}
	},

	onPageLoad: function(event)
	{
		var doc = event.originalTarget;

		wappalyzer.analyzePage(doc, true, false);
	},
	
	onUrlChange: function()
	{
		var doc = gBrowser.selectedBrowser.contentDocument;

		wappalyzer.analyzePage(doc, false, false);
	},

	urlChange:
	{
		QueryInterface: function(iid)
		{
			if ( iid.equals(Components.interfaces.nsIWebProgressListener)   ||
			     iid.equals(Components.interfaces.nsISupportsWeakReference) ||
			     iid.equals(Components.interfaces.nsISupports) )
			{
				return this;
			}

			throw Components.results.NS_NOINTERFACE;
		},

		onLocationChange: function(progress, request, url)
		{
			if ( !url )
			{
				wappalyzer.prevUrl = '';

				return;
			}

			if ( url.spec != wappalyzer.prevUrl )
			{
				wappalyzer.prevUrl = url.spec;
				
				// A tiny pauze to let the page load, otherwise some elements are displayed incorrectly in FF 3.5
				setTimeout('wappalyzer.onUrlChange()', 50);
			}
		},

		onStateChange:    function(a, b, c, d)       {},
		onProgressChange: function(a, b, c, d, e, f) {},
		onStatusChange:   function(a, b, c, d)       {},
		onSecurityChange: function(a, b, c)          {}
	},

	analyzePage: function(doc, doCount, manualDetect)
	{
		wappalyzer.currentTab = false;

		if ( !wappalyzer.isBookmarklet )
		{
			if ( doc.location.href == gBrowser.selectedBrowser.contentDocument.location.href )
			{
				if ( wappalyzer.lastHref == doc.location.href )
				{
					return;
				}
				
				wappalyzer.lastHref = doc.location.href;
				
				wappalyzer.currentTab = true;

				wappalyzer.clearDetectedApps();
			}
		}

		if ( wappalyzer.autoDetect || ( !wappalyzer.autoDetect && manualDetect ) )
		{
			// Scan URL for patterns
			for ( i = 0; i < wappalyzer.appDomain.length; i ++ )
			{
				if ( typeof(wappalyzer.checkUnique[wappalyzer.appDomain[i]]) == 'undefined' ) // Don't scan for apps that have already been detected
				{
					var regexDomain = wappalyzer.matchDomain[i];

					if ( typeof(doc.domain) != 'undefined' )
					{
						if ( regexDomain.test(doc.domain) )
						{
							wappalyzer.showApp(wappalyzer.appDomain[i], doc, doCount);
						}
					}
				}
			}

			// Scan HTML for patterns
			var html = doc.getElementsByTagName('html')[0].innerHTML;

			if ( html.length > 50000 ) // Prevent large documents from slowing things down
			{
				html = html.substring(0, 25000) + html.substring(html.length - 25000, html.length);
			}
			
			if ( html )
			{
				for ( i = 0; i < wappalyzer.app.length; i ++ )
				{
					if ( typeof(wappalyzer.checkUnique[wappalyzer.app[i]]) == 'undefined' ) // Don't scan for apps that have already been detected
					{
						var regex = wappalyzer.match[i];

						if ( regex.test(html) )
						{
							if ( wappalyzer.currentTab || wappalyzer.isBookmarklet )
							{
								wappalyzer.showApp(wappalyzer.app[i], doc, doCount);
							}
							else
							{
								wappalyzer.report(wappalyzer.app[i], doc.domain);
							}
						}
					}
				}
			}

			html = ''; // Free memory
		}
	},

	showApp: function(detectedApp, doc, doCount)
	{
		if ( detectedApp && typeof(wappalyzer.checkUnique[detectedApp]) == 'undefined' )
		{
			domain = doc.domain;

			if ( !wappalyzer.isBookmarklet )
			{
				// Hide Wappalyzer icon
				document.getElementById('wappalyzer-icon').style.display = 'none';

				// Show app icon and label
				var e = document.getElementById('wappalyzer-detected-apps');

				var child = document.createElement('image');

				child.setAttribute('src',   'chrome://wappalyzer/skin/app_icons/' + detectedApp + '.ico');
				child.setAttribute('class', 'wappalyzer-icon');

				if ( wappalyzer.showAppNames == 2 )
				{
					var panel = document.getElementById('wappalyzer-panel');

					var tooltiptext = panel.getAttribute('tooltiptext') + ( panel.getAttribute('tooltiptext') ? '\n' : '' ) + detectedApp;

					panel.setAttribute('tooltiptext', tooltiptext);
				}

				if ( wappalyzer.showAppNames == 3 ) 
				{
					child.setAttribute('onmouseover', 'wappalyzer.showLabels(true)');
					child.setAttribute('onmouseout',  'wappalyzer.showLabels(false)');
				}

				if ( wappalyzer.appsDetected )
				{
					child.setAttribute('style', 'margin-left: .5em');
				}

				e.appendChild(child);

				child = document.createElement('label');

				child.setAttribute('value', detectedApp);
				child.setAttribute('class', 'wappalyzer-app-name');

				if ( wappalyzer.showAppNames != 1 )
				{
					child.setAttribute('style', 'display: none;');
				}

				if ( wappalyzer.showAppNames == 3 ) 
				{
					child.setAttribute('onmouseover', 'wappalyzer.showLabels(true)');
					child.setAttribute('onmouseout',  'wappalyzer.showLabels(false)');
				}

				e.appendChild(child);
			}
			else
			{
				var e = document.getElementById('wappalyzer-bookmarklet-apps');
				
				e.innerHTML =
					( wappalyzer.appsDetected ? e.innerHTML : '' ) +
					wappalyzer.app[i] +
					'<br/>'
					;
			}

			if ( doCount )
			{
				wappalyzer.report(detectedApp, domain);
			}

			/* */
			// Enable application statistics menu item
			var e = document.getElementById('wappalyzer-app-stats');

			e.parentNode.setAttribute('disabled', false);

			var child = document.createElement('menuitem');

			child.setAttribute('label',     detectedApp);
			child.setAttribute('class',     'menuitem-iconic');
			child.setAttribute('type',      '');
			child.setAttribute('image',     'chrome://wappalyzer/skin/app_icons/' + detectedApp + '.ico');
			child.setAttribute('oncommand', 'wappalyzer.openTab(\'' + wappalyzer.homeUrl + 'stats/app/' + escape(detectedApp) + '\');');

			e.appendChild(child);
			/* */

			wappalyzer.appsDetected ++;

			wappalyzer.checkUnique[detectedApp] = true;
		}
	},

	report: function(detectedApp, domain)
	{
		if ( wappalyzer.enableTracking && wappalyzer.regexDomain.test(domain) )
		{
			if ( typeof(wappalyzer.history[domain]) == 'undefined' )
			{
				wappalyzer.history[domain] = [];
			}

			if ( typeof(wappalyzer.history[domain][detectedApp]) == 'undefined' )
			{
				wappalyzer.history[domain][detectedApp] = 0;
			}

			wappalyzer.history[domain][detectedApp] ++;

			wappalyzer.hitCount ++;

			if ( wappalyzer.hitCount > 100 )
			{
				wappalyzer.sendReport();
			}
		}
	},

	sendReport: function()
	// Anonymously send the name of the detected apps and domains to wappalyzer.com
	// You can turn this off in the options dialog
	// This is used to track the distibution of software, stats are publically available on the site
	{
		if ( wappalyzer.enableTracking && !wappalyzer.req )
		{
			var report = '';

			var i, j;

			if ( wappalyzer.history )
			{
				for ( i in wappalyzer.history )
				{
					report += '[' + i;

					for ( j in wappalyzer.history[i] )
					{
						report += '|' + j + ':' + wappalyzer.history[i][j];
					}

					report += ']';
				}
			}

			// Make POST request
			wappalyzer.req = new XMLHttpRequest();

			wappalyzer.req.open('POST', wappalyzer.homeUrl + 'report/', true);

			wappalyzer.req.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;

			wappalyzer.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			wappalyzer.req.onreadystatechange = function(e)
			{
				if ( wappalyzer.req.readyState == 4 )
				{
					if ( wappalyzer.req.status == 200 )
					{
						// Reset
						report = '';

						wappalyzer.hitCount = 0;
						wappalyzer.history  = [];
					}

					wappalyzer.req.close();

					wappalyzer.req = false;
				}
			};

			wappalyzer.req.send('d=' + encodeURIComponent(report));
		}
	},

	clearDetectedApps: function()
	{
		wappalyzer.appsDetected = 0;
		wappalyzer.checkUnique  = [];		

		// Show Wappalyzer icon
		document.getElementById('wappalyzer-icon').style.display = 'inline';

		// Clear app icons and labels
		e = document.getElementById('wappalyzer-detected-apps');

		while ( e.childNodes.length > 0 )
		{
			e.removeChild(e.childNodes.item(0));
		}
		
		// Clear tooltip
		var panel = document.getElementById('wappalyzer-panel');

		panel.setAttribute('tooltiptext', '');

		/* */
		// Disable and clear application statistics menu item
		e = document.getElementById('wappalyzer-app-stats');

		e.parentNode.setAttribute('disabled', true);
		
		while ( e.childNodes.length > 0 )
		{
			e.removeChild(e.childNodes.item(0));
		}
		/* */
	},

	showLabels: function(show)
	{
		e = document.getElementsByClassName('wappalyzer-app-name');

		for ( i = 0; i < e.length; i ++ )
		{
			e[i].style.display = show ? 'inline' : 'none';
		}
	},

	installSuccess: function()
	{		
		gBrowser.removeEventListener('load', wappalyzer.installSuccess, false);
		
		wappalyzer.openTab(wappalyzer.homeUrl + 'install/success/');
	},

	openTab: function(url)
	{
		gBrowser.selectedTab = gBrowser.addTab(url);
	},

	bookmarklet: function()
	{
		if ( typeof(gBrowser) == 'undefined' )
		{
			wappalyzer.isBookmarklet = true;

			if ( !document.getElementById('wappalyzer-bookmarklet') )
			{			
				var body = document.getElementsByTagName('body')[0];
				
				if ( body )
				{
					var container = document.createElement('div');

					container.innerHTML =
						'<div id="wappalyzer-bookmarklet" style="' +
						'	color: #332;' +
						'	font: 12px \'Trebuchet MS\';' +
						'	position: fixed;' +
						'	text-align: right;' +
						'	right: 2em;' +
						'	top: 2em;' +
						'	z-index: 9999999999;' +
						'	">' +
						'	<div id="wappalyzer-container" style="' +
						'		-moz-border-radius: 7px;' +
						'		-webkit-border-radius: 7px;' +
						'		background: #FAFAFA;' +
						'		border: 7px solid #332;' +
						'		margin-bottom: .3em;' +
						'		min-width: 15em;' +
						'		padding: 1em 2em;' +
						'		text-align: center;' +
						'		">' +
						'		<div style="' +
						'			border-bottom: 1px solid #332;' +
						'			font-size: 13px;' +
						'			padding-bottom: 1em;' +
						'			margin-bottom: 1em;' +
						'			"><strong>Wappalyzer</strong></div>' +
						'		<span id="wappalyzer-bookmarklet-apps"><em>No apps detected</em></span>' +
						'	</div>' +
						'	<span style="float: left;"><a href="http://wappalyzer.com" style="color: #332 !important;">home</a> | <a href="http://twitter.com/ElbertF" style="color: #332 !important;">follow me</a></span>' +
						'   <span style="float: right;">click to close</span>' +
						'</div>'
						;

					container.onclick = function() { body.removeChild(container); };

					body.appendChild(container);

					wappalyzer.analyzePage(document, false, false);
				}
			}
		}
	}
};

wappalyzer.bookmarklet();
