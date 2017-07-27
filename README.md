extractLiteral
===============

Adds a global function `extractLiteral( text, startIndex = 0)` which extracts
the longest string that can be successfully passed by `Number()`, starting at
`startIndex` within `text`.

```js
assert( extractLiteral( '  2.34E0 px ' ) === '  2.34E0 ' );
assert( extractLiteral( 'NaNin ' ) === 'NaN' );
assert( extractLiteral( '0xb112' ) === '0xb11' );
assert( extractLiteral( 'value: 0xffcc00;', 6 ) === ' 0xffcc00' );

// this breaks the parseInt rules:
assert( extractLiteral( '0xg' ) === '0' );
assert( extractLiteral( 'wibble' ) === '' );

// Extract a comma separated list of numbers:
function* extractList( str )
{
    for ( let pos = 0; pos < str.length; ++pos)
    {
        const res = extractLiteral( str, pos );
        if ( !res.length )
            throw new TypeError( `Unexpected text at char ${pos}` );

        yield +res;

        pos += res.length;
        if ( pos === str.length )
            break;

        if ( !str.startsWith( ",", pos ) )
            throw new TypeError( `Expected "," at char ${pos}` );
    }
}
```

`extractLiteral()` will support underscore separators in numbers, like
`1_000_000`, if `Number()` supports it.


extractLiteral.PATTERN
----------------------

`etractLiteral.PATTERN` is the _text_ that can be used to
construct a regular expression which will perform the same
function as `extractLiteral()`; for example:

```js

function Point( str )
    {
        const re = new RegExp( String.raw`^\s*\((${extractLiteral.PATTERN}),(${extractLiteral.PATTERN})\)\s*$` );
        const result = re.exec( str );
        if ( !result )
            throw new TypeError( "Invalid string" );
        return [ +result[1], +result[2] ];
    }

const p = Point( '( +4.3, 1E-10 ) ' );
assert( p[0] === 4.3 );    
assert( p[1] === 1E-10 );    
```


