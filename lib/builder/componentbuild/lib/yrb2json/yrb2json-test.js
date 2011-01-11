/**
 * Tests yrb2json.
 *
 * Run as:
 *     java -jar js.jar yrb2json-test.js
 */

/*jslint rhino: true, onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */
/*global java: false, yrb2json: false */

load("yrb2json.js");

(function () {

    var errors, source, expectedJSON, actual, j, invalidInput, input;
    
    errors = 0;
    print("Starting yrb2json test.");
    
    // expected JSON output for test.pres file
    expectedJSON = 
        '{"MONTHS_SHORT":"1월, 2월, 3월, 4월, 5월, 6월, 7월, 8월, 9월, 10월, 11월, 12월",' +
        '"MONTHS_LONG":"1월\\n2월\\n3월\\n4월\\n5월\\n6월\\n7월\\n8월\\n9월\\n10월\\n11월\\n12월",' +
        '"ESCAPES":" \\\\\\n\\t# ",' +
        '"KEY WITH SPACES":"1월, 2월, 3월, 4월, 5월, 6월, 7월, 8월, 9월, 10월, 11월, 12월",' +
        '"WITH QUOTES \\"":"\\"",' +
        '"EMPTY":"",' +
        '"EMPTY HEREDOC":""}';

    // test.pres has valid data
    source = readFile("yrb2json-test.pres");
    if (source) {
        try {
            actual = yrb2json.convert(source);
            if (actual !== expectedJSON) {
                print("Wrong result for good input:");
                print("actual  : " + actual);
                print("expected: " + expectedJSON);
                print(actual.length + "/" + expectedJSON.length);
                for (j = 0; j < Math.min(actual.length, expectedJSON.length); j++) {
                    if (actual.charAt(j) !== expectedJSON.charAt(j)) {
                        print(j);
                        print(actual.charAt(j) + "/" + expectedJSON.charAt(j));
                    }
                }
                errors++;
            }
        } catch (e1) {
            print(e1.toString());
            errors++;
        }
    } else {
        print("Empty test data - make sure to run test from yrb2json directory.");
        errors++;
    }
    
    invalidInput = {
        "&": "Missing '=' in line &.",
        "=": "Empty key not allowed.",
        "= value": "Empty key not allowed.",
        "key = <<<": "Incomplete heredoc with id .",
        "key = value\\": "Illegal escape sequence: unaccompanied \\",
        "key = v\\u0061lue": "Illegal escape sequence: \\u",
        "key = value\\\"": "Illegal escape sequence: \\\"",
        "k\\#ey = value": "Backslash not allowed in key: k\\#ey",
        "key = <<< end\nend ": "Incomplete heredoc with id end.",
        "key = <<< end": "Incomplete heredoc with id end.",
        "key = <<< end\n": "Incomplete heredoc with id end.",
        "key = <<< end\nend; ": "Incomplete heredoc with id end."
    };
    for (input in invalidInput) {
        if (invalidInput.hasOwnProperty(input)) {
            try {
                actual = yrb2json.convert(input);
            } catch (e2) {
                if (e2.message !== invalidInput[input]) {
                    print("Didn't get expected exception for " + input + "; exception: " + e2.toString());
                    errors++;
                }
                continue;
            }
            print("Didn't get expected exception for " + input);
            errors++;
        }
    }
    print(errors + (errors === 1 ? " error." : " errors."));
    print("Finished yrb2json test.");
    java.lang.System.exit(errors);
}());

