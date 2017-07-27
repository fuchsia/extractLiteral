"use strict";

const extractLiteral = (function() {

    const hex2015 = String.raw`[0-9A-Fa-f]+`,
          float2015 = String.raw`(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?`,
          oct2015 = String.raw`[0-7]+`,
          bin2015 = String.raw`[01]+`;

    const hex2018 = String.raw`[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*`,
          float2018 = String.raw`(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+)?`,
          oct2018 = String.raw`[0-7]+(?:_[0-7]+)*`,
          bin2018 = String.raw`[01]+(?:_[0-1]+)*`;

    
        // 2018: /x/y,
    const literal2015 = String.raw`\s*(?:NaN|(?:[+-]?(?:Infinity|0(?:[Bb]${bin2015}|[Oo]${oct2015}|[Xx]${hex2015}|(?:${float2015})?)|${float2015})))\s*`,
          literal2018 = String.raw`\s*(?:NaN|(?:[+-]?(?:Infinity|0(?:[Bb]${bin2018}|[Oo]${oct2018}|[Xx]${hex2018}|_?${float2018})|${float2018})))\s*`,

          defaultPattern = !!Number('1_1') ? literal2018 : literal2015,
          defaultExpr = new RegExp( defaultPattern, 'y' );

    function extractLiteral( text, startIndex = 0 )
        {
            defaultExpr.lastIndex = startIndex;
            return ( defaultExpr.exec( text ) || [""] )[0];
        }

    extractLiteral.PATTERN = defaultPattern;
    return extractLiteral;
})();

if ( typeof module !== 'undefined' )
    module.exports = extractLiteral;


