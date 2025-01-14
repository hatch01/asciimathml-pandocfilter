#!/usr/bin/env node

// Pandoc filter to convert expressions in AsciiMath notation into LaTeX expressions

var pandoc = require('pandoc-filter');
var asciimath = require('./ASCIIMathToTeX.js');
var Formula = pandoc.Formula; // for Math

function action(type, value , format, meta) {
    if (type === 'Math') {
        if ((value.length == 2 && value[1].length >= 2 && value[1].slice(0, 2) === ':l')) {
            return Formula(value[0], value[1].slice(2));
        } else {
            switch (value[0]['t']) {
                case 'DisplayMath':
                case 'InlineMath':
                    var latexout = "" + asciimath.AMTparseAMtoTeX(value[1]);
                    return Formula(value[0], latexout);
            }
        }
    }
}


pandoc.stdio(action);
