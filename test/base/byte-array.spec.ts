import { ByteArray } from 'sim-core';

describe('A ByteArray', () => {
  it('stores a sequence of bytes', () => {
    let bs = new ByteArray( [ 0, 1, 2, 3, 4 ] );

    expect( bs.toString() ).toBe( "0001020304" );
  } );

  it('can be instanciated from an array of bytes', () => {
    let bs = new ByteArray( [ 0, 1, 2, 3, 4 ] );

    expect( bs.toString() ).toBe( "0001020304" );
    var bytes = [];
    for( let i = 0; i < 10000; ++i ) bytes[ i ] = i & 0xff;

    bs = new ByteArray( bytes );
    expect( bs.length ).toBe( 10000 );
  } );

  it('can be compared (equal)', () => {
    let bs1 = new ByteArray( [ 0, 1, 2, 3, 4 ] );
    let bs2 = new ByteArray( "00 01 02 03 04", ByteArray.HEX );
    let bs3 = bs1.clone().setByteAt( 1, 0x99 );

    expect( bs1.equals( bs1 ) ).toBe(true);
    expect( bs1.equals( bs2 ) ).toBe(true);
    expect( bs1.equals( bs3 ) ).not.toBe(true);
  } )

} );
