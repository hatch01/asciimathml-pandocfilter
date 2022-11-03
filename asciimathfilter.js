#!/usr/bin/env node

// Pandoc filter to convert expressions in AsciiMath notation into LaTeX expressions

var pandoc = require('pandoc-filter');
var asciimath = require('./asciimath-based/ASCIIMathTeXImg.js');
var Formula = pandoc.Formula; // for Math

function action({ t: type, c: value }, format, meta) {
    // console.log(type);
    // console.log(value);
    // console.log(type);
    // if (type === 'Math') {
    //     console.log(!(value.length == 2 && value[1].length >= 2 && value[1].slice(0, 2) === ':l'));
    // }
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
