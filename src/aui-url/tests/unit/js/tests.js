YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-url');

    suite.add(new Y.Test.Case({
        name: 'Url',

        //---------------------------------------------
        // Tests
        //---------------------------------------------

        'manage parameters': function() {
            var url = new Y.Url('http://host.com?p1=1&p1=2');

            Y.Assert.areSame(url.getQuery(), 'p1=1&p1=2');
            Y.Assert.areSame(Y.Object.keys(url.getParameters()).length, 1);
            Y.Assert.areSame(Y.Object.keys(url.getParameters())[0], 'p1');
            Y.Assert.areSame(url.getParameter('p1').length, 2);
            Y.Assert.areSame(url.getParameter('p1')[0], 1);
            Y.Assert.areSame(url.getParameter('p1')[1], 2);

            url.addParameter('p1', 3);

            Y.Assert.areSame(url.getParameter('p1').length, 3);
            Y.Assert.areSame(url.getParameter('p1')[0], 1);
            Y.Assert.areSame(url.getParameter('p1')[1], 2);
            Y.Assert.areSame(url.getParameter('p1')[2], 3);

            url.addParameter('p2', 1);

            Y.Assert.areSame(url.getQuery(), 'p1=1&p1=2&p1=3&p2=1');
            Y.Assert.areSame(Y.Object.keys(url.getParameters())[1], 'p2');
            Y.Assert.areSame(url.getParameter('p2'), 1);

            url.addParameter('p2', 2);

            Y.Assert.areSame(url.getParameter('p2').length, 2);
            Y.Assert.areSame(url.getParameter('p2')[0], 1);
            Y.Assert.areSame(url.getParameter('p2')[1], 2);

            url.setParameter('p2', 1);

            Y.Assert.areSame(Y.Object.keys(url.getParameters())[1], 'p2');
            Y.Assert.areSame(url.getParameter('p2'), 1);

            url.removeParameter('p2');

            Y.Assert.isUndefined(url.getParameter('p2'));

            url.addParameters({
                p1: 4,
                p2: 1
            });

            Y.Assert.areSame(url.getParameter('p1').length, 4);
            Y.Assert.areSame(url.getParameter('p1')[0], 1);
            Y.Assert.areSame(url.getParameter('p1')[1], 2);
            Y.Assert.areSame(url.getParameter('p1')[2], 3);
            Y.Assert.areSame(url.getParameter('p1')[3], 4);
            Y.Assert.areSame(url.getParameter('p2'), 1);
            Y.Assert.areSame(url.toString(), 'http://host.com?p1=1&p1=2&p1=3&p1=4&p2=1');
        },

        'protocol only': function() {
            Y.Assert.areSame(new Y.Url('http:').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('https://').getProtocol(), 'https');
        },

        'protocol + host + port': function() {
            Y.Assert.areSame(new Y.Url('http://host').getHost(), 'host');
            Y.Assert.areSame(new Y.Url('http://host').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://host.com').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://host.com').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://host.com:81').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://host.com:81').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://host.com:81').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://host/').getHost(), 'host');
            Y.Assert.areSame(new Y.Url('http://host/').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://subdomain.host.com').getHost(), 'subdomain.host.com');
            Y.Assert.areSame(new Y.Url('http://subdomain.host.com').getProtocol(), 'http');
        },

        'user + password': function() {
            Y.Assert.areSame(new Y.Url('http://user:@host.com').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:@host.com').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:@host.com').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:@host.com:81').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:@host.com:81').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:@host.com:81').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:@host.com:81').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81#anchor').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81#anchor').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81#anchor').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/#anchor').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/#anchor').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/#anchor').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/?query').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/?query').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/?query').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/?query').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory#anchor').getDirectory(), '/directory');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory#anchor').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory#anchor').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory#anchor').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory').getDirectory(), '/directory');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/#anchor').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/#anchor').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/#anchor').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/#anchor').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/?query').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/?query').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/?query').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/?query').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/?query').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getQuery(), 'query=1');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1&test=2').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1&test=2').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1&test=2').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1&test=2').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1&test=2').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1&test=2').getQuery(), 'query=1&test=2');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/file.ext?query=1&test=2').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/').getDirectory(), '/directory/sub.directory/');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/file.ext').getDirectory(), '/directory/sub.directory/');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/file.ext').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/file.ext').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/file.ext').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/file.ext').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory/sub.directory/file.ext').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory?query').getDirectory(), '/directory');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory?query').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory?query').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory?query').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/directory?query').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/file.ext').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/file.ext').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/file.ext').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/file.ext').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/file.ext').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81/file.ext').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81?query').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81?query').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81?query').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('http://user:pass@host.com:81?query').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user@host.com').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user@host.com').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user@host.com').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('http://user@host.com:81').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('http://user@host.com:81').getPort(), '81');
            Y.Assert.areSame(new Y.Url('http://user@host.com:81').getProtocol(), 'http');
            Y.Assert.areSame(new Y.Url('http://user@host.com:81').getUser(), 'user');
        },

        'relative urls': function() {
            Y.Assert.areSame(new Y.Url('#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('/#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('/').getDirectory(), '/');
            Y.Assert.areSame(new Y.Url('//host.com').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getDirectory(), '/direc.tory/');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getPort(), '81');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getQuery(), 'query=1&test=2');
            Y.Assert.areSame(new Y.Url('//user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('/?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('/directory/').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('/directory/sub.directory/file.ext?query=1&test=2#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('/directory/sub.directory/file.ext?query=1&test=2#anchor').getDirectory(), '/directory/sub.directory/');
            Y.Assert.areSame(new Y.Url('/directory/sub.directory/file.ext?query=1&test=2#anchor').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('/directory/sub.directory/file.ext?query=1&test=2#anchor').getQuery(), 'query=1&test=2');
            Y.Assert.areSame(new Y.Url('/file.ext').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('192.168.1.1').getHost(), '192.168.1.1');
            Y.Assert.areSame(new Y.Url('?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('?query=1&test=2#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('?query=1&test=2#anchor').getQuery(), 'query=1&test=2');
            Y.Assert.areSame(new Y.Url('host.com#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('host.com#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com/').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com/directory/#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('host.com/directory/#anchor').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('host.com/directory/#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com/directory/?query').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('host.com/directory/?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com/directory/?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('host.com/directory/file.ext').getDirectory(), '/directory/');
            Y.Assert.areSame(new Y.Url('host.com/directory/file.ext').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('host.com/directory/file.ext').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com/file.ext').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('host.com/file.ext').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com:81').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com:81').getPort(), '81');
            Y.Assert.areSame(new Y.Url('host.com:81/').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com:81/').getPort(), '81');
            Y.Assert.areSame(new Y.Url('host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getDirectory(), '/direc.tory/');
            Y.Assert.areSame(new Y.Url('host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getPort(), '81');
            Y.Assert.areSame(new Y.Url('host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getQuery(), 'query=1&test=2');
            Y.Assert.areSame(new Y.Url('host.com?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('host.com?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('localhost').getHost(), 'localhost');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getDirectory(), '/direc.tory/');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getPassword(), 'pass');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getPort(), '81');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getQuery(), 'query=1&test=2');
            Y.Assert.areSame(new Y.Url('user:pass@host.com:81/direc.tory/file.ext?query=1&test=2#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('user@host.com#anchor').getAnchor(), 'anchor');
            Y.Assert.areSame(new Y.Url('user@host.com#anchor').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('user@host.com#anchor').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('user@host.com').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('user@host.com').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('user@host.com/').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('user@host.com/').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('user@host.com/file.ext').getFile(), 'file.ext');
            Y.Assert.areSame(new Y.Url('user@host.com/file.ext').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('user@host.com/file.ext').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('user@host.com:81').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('user@host.com:81').getPort(), '81');
            Y.Assert.areSame(new Y.Url('user@host.com:81').getUser(), 'user');
            Y.Assert.areSame(new Y.Url('user@host.com?query').getHost(), 'host.com');
            Y.Assert.areSame(new Y.Url('user@host.com?query').getQuery(), 'query=');
            Y.Assert.areSame(new Y.Url('user@host.com?query').getUser(), 'user');
        }

    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'aui-url' ] });
