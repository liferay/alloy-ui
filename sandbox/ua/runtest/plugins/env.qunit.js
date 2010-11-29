/**
 * @author thatcher
 */
var starttime = new Date().getTime(),
    endtime,
    q$;

Envjs({
    //let it load the script from the html
    scriptTypes: {
        "text/javascript"   :true
    },
    afterScriptLoad:{
        'data/testrunner.js': function(){
            //console.log('loaded test runner');
            //hook into qunit.log
            var count = 0,
                module;
            
            
            try{
            //jquery/qunit 1.3.x - current
                QUnit.moduleStart = function(name, testEnvironment) {
                    module = name;
                };
                QUnit.log = function(result, message){
                    console.log('{'+module+'}(' + (count++) + ')[' + 
                        ((!!result) ? 'PASS' : 'FAIL') + '] ' + message);
                };
                //hook into qunit.done
                QUnit.done = function(fail, pass){
                    endtime = new Date().getTime();
                    console.log('\n\tRESULTS: ( of '+(pass+fail)+' total tests )');
                    console.log('\t\tPASSED: ' +pass);
                    console.log('\t\tFAILED: ' +fail);
                    console.log('\tCompleted in '+(endtime-starttime)+' milliseconds.\n');
                    
                    console.log('Writing Results to File');
                    jQuery('script').each(function(){
                        this.type = 'text/envjs';
                    });
                    Envjs.writeToFile(
                        document.documentElement.outerHTML, 
                        Envjs.uri('results.html')
                    );
                };
                
                //allow jquery to run ajax
                isLocal = false;
                jQuery.ajaxSetup({async : false});
                
                //we are breaking becuase our cirucular dom referencing 
                //causes infinite recursion somewhere in jsDump;
                QUnit.jsDump = {
                    parse: function(thing){
                        return thing+"";
                    }
                }
                
                //we know some ajax calls will fail becuase
                //we are not running against a running server
                //for php files
                var handleError = jQuery.handleError;
                jQuery.handleError = function(){
                    ok(false, 'Ajax may have failed while running locally');
                    try{
                        handleError(arguments);
                    }catch(e){
                        console.log(e);
                    }
                    //allow tests to gracefully continue
                    start();
                };
                //allow unanticipated xhr error with no ajax.handleError 
                //callback (eg jQuery.getScript) to exit gracefully
                Envjs.onInterrupt = function(){
                    console.log('thread interupt: gracefully continuing test');
                    start();
                };
                
               
                Envjs.onScriptLoadError = function(script, e){
                    console.log("failed to load script %s %s", script.src, script.text, e);    
                    ok(false, 'Ajax may have failed to load correct script while running locally');
                    //allow tests to gracefully continue
                    start();
                };
                
            }catch(e){
                //jquery 1.2.x 
                console.log('qunit pre');
                q$ = _config.Test.push;
                _config.Test.push = function(){
                    try{
                        console.log("[%s] %s", arguments[0][0], arguments[0][1]);
                    }catch(e){
                        console.log("[error] %s", e);
                    }finally{
                        return Array.prototype.push.apply(_config.Test, arguments);
                    }
                };
            }
        }
    }
});

