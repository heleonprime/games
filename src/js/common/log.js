let debug = 1,
debugPref = 'GameApp',
debugPrefStyle = 'color: #e41920; font-size: larger';
let s = window.location.search;
let urlParams = new URLSearchParams(s);
if(urlParams.get('debug') == 1) // Debug will work if the page has a debug param equals 1
    debug = 1;

if(debug)
{
    let oConsoleLog = console.log;
    console.log = function() {
        let args = [];
        if(debugPref)
        {
            args.push( (debugPrefStyle ? '%c' : '' ) + '[' + debugPref + ']' );
            if( debugPrefStyle ) args.push( debugPrefStyle );
        }
        for( var i = 0; i < arguments.length; i++ ) {
            args.push( arguments[i] );
        }
        oConsoleLog.apply( console, args );
    };
}
export default function l(...args){
    if(debug)
        args.forEach(e => console.log( e ));
};