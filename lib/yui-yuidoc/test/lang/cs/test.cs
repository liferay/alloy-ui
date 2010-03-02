using System;
/**
* C# Module Description
* @module lang.csharp
*/

/**
* C# Class Description
* @class ReadAll
* @namespace PlayingAround
*/
namespace PlayingAround {
    class ReadAll {
        /**
        * Main Method
        * @method Main
        * @static
        */
        public static void Main(string[] args) {
            string contents = System.IO.File.ReadAllText(@"C:\t1");
            Console.Out.WriteLine("contents = " + contents);
        }
    }
}

