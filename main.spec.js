
 const N = global.Number;

 global.Number = text => N( typeof text === 'string' ? text.replace( /_/g, '' ) : text );
 const extractLiteral = require( './main.js' );
 global.Number = N;

 const options = undefined; // { underscores:true};

it( "T1 tokenize an unprefixed integer", () => {
    expect( extractLiteral( "2" ) ).toEqual( "2" );
} );

it( "T2 tokenize a signed integer", () => {
    expect( extractLiteral( "+2" ) ).toEqual( "+2" );
} );

it( "T3 tokenize a negative integer", () => {
    expect( extractLiteral( "-3" ) ).toEqual( "-3" );
} );

it( "T4 tokenize an integer with leading whitespace", () => {
    expect( extractLiteral( "  2" ) ).toEqual( "  2" );
} );

it( "T5 start at the required integer", () => {
    expect( extractLiteral( "+2", 1 ) ).toEqual( "2" );
} );



it( "T6 tokenize a float", () => {
    expect( extractLiteral( "2.25" ) ).toEqual( "2.25" );
} );

it( "T7 tokenize a float that begins with a decimal point", () => {
    expect( extractLiteral( ".401" ) ).toEqual( ".401" );
} );

it( "T8 tokenise a float that ends with a decimal point", () => {
    expect( extractLiteral( "401." ) ).toEqual( "401." );
} );

it( "T9 tokenize a integer with an exponent", () => {
    expect( extractLiteral( "2E7" ) ).toEqual( "2E7" );
} );


it( "T10 parse a decimal with an unsigned exponent", () => {
    expect( extractLiteral( "\t2.25E10" ) ).toEqual( "\t2.25E10" );
} );

it( "T11 tokenizer a float with an negative exponent", () => {
    const str = "3000000000000E-3";
    expect( extractLiteral( str ) ).toEqual( str );
} );

it( "T12 tokenize a float with an aborted exponent", () => {
    expect( extractLiteral( "20E+" ) ).toEqual( "20" );
} );

it( "T13 don't tokenize an 'e'", () => {
    expect( extractLiteral( "e200" ) ).toEqual( "" );
} );

it( "T35 don't tokenize an '.' with an exponent", () => {
    expect( extractLiteral( ".e-2" ) ).toEqual( "" );
} );

it( "T36 tokenize a decimal and exponent", () => {
    expect( extractLiteral( ".1e1" ) ).toEqual( ".1e1" );
} );





it( "T32 don't tokenize a '.'", () => {
    expect( extractLiteral( "." ) ).toEqual( "" );
} );


it( "T14 tokenise an integer with underscores", () => {
    expect( extractLiteral( "1_2", undefined, options ) ).toBe("1_2");
} );

it( "T15 tokenizer a decimal with underscores", () => {
    expect( extractLiteral( "0.2_5", undefined, options ) ).toBe("0.2_5");
} );

it( "T16 terminate parsing a integer at second underscore", () => {
    expect( extractLiteral( "3__2", undefined, options ) ).toBe("3");
} );

it( "T17 terminate parsing a decimal at second underscore", () => {
    expect( extractLiteral( "0.1__2", undefined, options ) ).toBe("0.1");
} );

it( "T18 reject a number than begins with an underscore", () => {
    expect( extractLiteral( "_1", undefined, options ) ).toBe( "" );
} );

it( "T19 reject a decimal if it begins with an underscore", () => {
    expect( extractLiteral( "1._2", undefined, options ) ).toBe("1.");
} );

it( "T20 reject a decimal if the decimal point occurs after an undescore", () => {
    expect( extractLiteral( "2_.3", undefined, options ) ).toBe("2");
} );

it( "T21 reject a exponent if the exponent occurs after an undescore", () => {
    expect( extractLiteral( "2.3_E1", undefined, options ) ).toBe("2.3");
} );

it( "T37 don't tokenizer an undescore in the xponent", () => {
    expect( extractLiteral( "2.3E1_1", undefined, options ) ).toBe("2.3E1");
} );


it( "T38 underscoe following a zero should be legal", () => {
    expect( extractLiteral( "0_1", undefined, options ) ).toBe("0_1");
} );



it( "T22 tokenize an almost prefix", () => {
    expect( extractLiteral( "0g" ) ).toBe("0");
} );


it( "T23 tokenizer a hex number with a hex prefix", () => {
    expect( extractLiteral( "0x11" ) ).toEqual( "0x11" );
} );

// This should probably, actually, return 0. Which is what happens.
it( "T24 reject hex number when there are no digits after the prefix", () => {
   expect( extractLiteral( "0xg" ) ).toBe("0");
} );

it( "T25 tokenize rhex numbers with underscores", () => {
    expect( extractLiteral( "<0xff_cc_dd>", 1, options ) ).toBe( "0xff_cc_dd" );
} );

it( "T26 tokenize a hex number with a leading minus before the prefix", () => {
    expect( extractLiteral( "-0xc" ) ).toBe( "-0xc" );
} );
it( "T27 tokenize a hex number a leading plus before the prefix", () => {
    expect( extractLiteral( "+0xd" ) ).toBe( "+0xd" );
} );



// the code is the same, if the above works for hex; it will work for other prefixes;
it( "T28 tokenizer a number with a binary prefix", () => {
    expect( extractLiteral( "0b11" ) ).toEqual( "0b11" );
} );

it( "T29 tokenizer a number with an octal prefix", () => {
    expect( extractLiteral( "0o119" ) ).toEqual( "0o11" );
} );


it( "T30 include trailing white space", () => {
    expect( extractLiteral( "0X10  " ) ).toEqual( "0X10  " );
} );

it( "T31 terminate at garbage", () => {
    expect( extractLiteral( "00_00E  " ) ).toEqual( "00_00" );
} );

it( "T33 don't pass two decimals", () => {
    expect( extractLiteral( "1.12.2  " ) ).toEqual( "1.12" );
} );

it( "T34 don't pass two decimals in a row", () => {
    expect( extractLiteral( "10..12  " ) ).toEqual( "10." );
} );


it( "T39 should parse Infinity", () => {
    expect( extractLiteral( "Infinity") ).toBe("Infinity");
} );

it( "T40 should extract signed Infinity with trailing noise", () => {
    expect( extractLiteral( " +Infinity4" ) ).toBe(" +Infinity");
} );


it( "T41 should parse NaN", () => {
    expect( extractLiteral( "NaNNY" ) ).toBe("NaN");
} );



it ( "F1 parse a comma separated list of numbers", () => {

    function* extractList( str )
        {
            if ( !str.length )
                return;
                
            for ( let pos = 0;; )
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
                ++pos                    
            }    
        }

    expect( [...extractList( "1,0.2,3., 4E100  , -5.000" ) ] ).toEqual( [1, 0.2, 3, 4E100, -5 ] );
} );

{
    const re = new RegExp( String.raw`^\s*\((${extractLiteral.PATTERN}),(${extractLiteral.PATTERN})\)\s*$` );
    function Point( str )
        {
            const result = re.exec( str );
            if ( !result )
                throw new TypeError( "Invalid string" );
            return [ +result[1], +result[2] ];            
        }
    
    it( "F2 parse a coord pair using the pattern", () => {

        expect( new Point( '( 4.0, 0x11) ' ) ).toEqual( [4, 17] );   
    } );

    it( "F3 reject an invalid pattern", () => {
    
        expect( () => new Point( '(2,0x0.1 )' ) ).toThrow();   
    } );
}    
    
























