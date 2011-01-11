/**
 * Converts resource bundles provided in YRB format into JSON format.
 *
 * YRB format is documented at
 * http://developer.yahoo.com/yui/3/intl/index.html#yrb
 *
 * Run as:
 *     java -jar js.jar yrb2json-console.js yrb2json.js inputFile outputFile
 *
 */

/*jslint rhino: true, onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */
/*global java: false, yrb2json: false */

if (arguments.length !== 3) {
    print("Usage: java -jar yrb2json-console.js yrb2json.js inputFile outputFile");
    java.lang.System.exit(1);
}

load(arguments[0]);
    
(function (inputFile, outputFile) {
    
    var yrb, json, writer;
    
    print("Converting " + inputFile + " to " + outputFile);
    
    try {
        yrb = readFile(inputFile, "utf-8");
        json = yrb2json.convert(yrb);
    
        outputFile = outputFile.replace(/\//, java.io.File.separator);
        writer = new java.io.OutputStreamWriter(new java.io.FileOutputStream(outputFile), "utf-8");
        writer.write(json, 0, json.length);
        writer.flush();
    } catch (e) {
        print(e.toString());
        java.lang.System.exit(1);
    }
}(arguments[1], arguments[2]));

