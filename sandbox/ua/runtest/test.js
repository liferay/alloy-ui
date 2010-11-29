// Init
load("runtest/env.js");
// load("build/runtest/plugins/env.qunit.js");

Envjs({
    //let it load the script from the html
    scriptTypes: {
        "text/javascript"   :true
    },
	// appCodeName: 'NATE',
	// version: '5.0',
	// appName: 'Netscape',
	// appVersion: '5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
	// platform: 'MacIntel',
	// userAgent: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)'
});

var USER_AGENTS = {
	'aol': {
		'1.1': 'Mozilla/4.0 (compatible; MSIE 7.0; America Online Browser 1.1; rev1.5; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)'
	},
	'camino': {
		'2.0.3': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; nl; rv:1.9.0.19) Gecko/2010051911 Camino/2.0.3 (MultiLang) (like Firefox/3.0.19)',
		'1.5.1': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en; rv:1.8.1.6) Gecko/20070809 Camino/1.5.1',
		'0.9': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.8b2) Gecko Camino/0.9+',
	},
	'chrome': {
		'9.1.0': 'Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/540.0 (KHTML, like Gecko) Ubuntu/10.10 Chrome/9.1.0.0 Safari/540.0',
		'8.0.558.0': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/534.10 (KHTML, like Gecko) Chrome/8.0.558.0 Safari/534.10',
		'7.0.500.0': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.6 (KHTML, like Gecko) Chrome/7.0.500.0 Safari/534.6',
		'6.0.472.33': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.33 Safari/534.3',
		'5.0.375.86': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_0; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.86 Safari/533.4',
	},
	'firefox': {
		'4.0': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)',
		'3.6.7': 'Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.7) Gecko/20100809 Fedora/3.6.7-1.fc14 Firefox/3.6.7',
		'3.5.6': 'Mozilla/5.0 (X11; U; Linux x86_64; fr; rv:1.9.1.6) Gecko/20091215 Ubuntu/9.10 (karmic) Firefox/3.5.6',
		'3.0.8': 'Mozilla/6.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8 (.NET CLR 3.5.30729)',
		'2.0.0.7': 'Mozilla/5.0 (X11; U; SunOS sun4u; pl-PL; rv:1.8.1.6) Gecko/20071217 Firefox/2.0.0.6',
		'1.5.0.9': 'Mozilla/5.0 (X11; U; OpenBSD amd64; en-US; rv:1.8.0.9) Gecko/20070101 Firefox/1.5.0.9',
	},
	'flock': {
		'2.6.0': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.19) Gecko/2010061201 Firefox/3.0.19 Flock/2.6.0',
		'1.2.4': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.16) Gecko/20080714 Firefox/2.0.0.16 Flock/1.2.4',
		'0.7.12': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.0.11) Gecko/20070321 Firefox/1.5.0.11 Flock/0.7.12',
	},
	'icab': {
		'4.7': 'iCab/4.7 (Macintosh; U; Intel Mac OS X)',
		'3.0.5': 'Mozilla/5.0 (compatible; iCab 3.0.5; Macintosh; U; PPC Mac OS)',
		'2.9.9': 'iCab/2.9.9 (Macintosh; U; 68K)'
	},
	'ie': {
		'9.0': 'Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))',
		'8.0': 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)',
		'7.0': 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
		'6.0': 'Mozilla/5.0 (Windows; U; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)',
		'5.5': 'Mozilla/4.0 (compatible; MSIE 5.50; Windows NT; SiteKiosk 4.9; SiteCoach 1.0)',
	},
	'konqueror': {
		'4.4': 'Mozilla/5.0 (compatible; Konqueror/4.4; Linux) KHTML/4.4.1 (like Gecko) Fedora/4.4.1-1.fc12',
		'3.4': 'Mozilla/5.0 (compatible; Konqueror/3.4; SunOS) KHTML/3.4.1 (like Gecko)',
		'2.2.2': 'Mozilla/5.0 (compatible; Konqueror/2.2.2; Linux)',
	},
	'netscape': {
		'9.0': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.8pre) Gecko/20071015 Firefox/2.0.0.7 Navigator/9.0',
		'8.0.1': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20050519 Netscape/8.0.1 FirePHP/0.3',
		'7.0.2': 'Mozilla/5.0 (Windows; U; Win98; de-DE; rv:1.0.2) Gecko/20030208 Netscape/7.02',
		'6.2.3': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:0.9.4.1) Gecko/20020508 Netscape6/6.2.3',
	},
	'opera': {
		'9.7': 'Opera/9.70 (Linux ppc64 ; U; en) Presto/2.2.1',
		'9.5.2': 'Opera/9.52 (X11; Linux x86_64; U; ru)',
		'8.5.4': 'Opera/8.54 (Windows NT 5.1; U; ru)',
		'7.5.3': 'Opera/7.53 (Windows NT 5.1; U) [en]',
		'6.0.2': 'Mozilla/5.0 (Windows 2000; U) Opera 6.02 [en]',
	},
	'safari': {
		'5.0.2': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-HK) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5',
		'4.0.3': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-us) AppleWebKit/531.9 (KHTML, like Gecko) Version/4.0.3 Safari/531.9',
		'3.2': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; hu-HU) AppleWebKit/525.26.2 (KHTML, like Gecko) Version/3.2 Safari/525.26.13',
		'2.0.2': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13',
		'1.3.1': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/312.3.3',
	}
};

window.USER_AGENTS = USER_AGENTS;

for (var i in USER_AGENTS) {
	var baseBrowserKey = i;
	var userAgent = USER_AGENTS[i];
	var uaString = '';

	for (var j in userAgent) {
		var browserKey = baseBrowserKey + '/' + j;

		uaString = userAgent[j];

		window.USER_AGENT_KEY = browserKey;
		window.navigator.userAgent = uaString;

		window.location = "test.html";
	}
}
