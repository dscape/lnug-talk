// not valid js - just for @dscape to walkthrought and explain
// check github.com/dscape/clarinet for full source
clarinet.STATE =
  { BEGIN                             : S++
  , VALUE                             : S++ // general stuff
  , OPEN_OBJECT                       : S++ // {
  , CLOSE_OBJECT                      : S++ // }
  , OPEN_ARRAY                        : S++ // [
  , CLOSE_ARRAY                       : S++ // ]
  , TEXT_ESCAPE                       : S++ // \ stuff
  , STRING                            : S++ // ""
  , BACKSLASH                         : S++
  , END                               : S++ // No more stack
  , OPEN_KEY                          : S++ // , "a"
  , CLOSE_KEY                         : S++ // :
  , TRUE                              : S++ // r
  , TRUE2                             : S++ // u
  , TRUE3                             : S++ // e
  , FALSE                             : S++ // a
  , FALSE2                            : S++ // l
  , FALSE3                            : S++ // s
  , FALSE4                            : S++ // e
  , NULL                              : S++ // u
  , NULL2                             : S++ // l
  , NULL3                             : S++ // l
  , NUMBER_DECIMAL_POINT              : S++ // .
  , NUMBER_DIGIT                      : S++ // [0-9]    
  };

//
// EMIT
//
function emitNode(parser, event, data) {
  if (parser.textNode) closeValue(parser);
  emit(parser, event, data);
}

//
// WRITE
//
function write (chunk) {
  var parser = this;
  if (this.error) throw this.error;
  if (parser.closed) return error(parser,
    "Cannot write after close. Assign an onready handler.");
  if (chunk === null) return end(parser);
  var i = 0, c = chunk[0], p = parser.p;
  if (clarinet.DEBUG) console.log('write -> [' + chunk + ']');
  while (c) {
    p = c;
    parser.c = c = chunk.charAt(i++);
    // if chunk doesnt have next, like streaming char by char
    // this way we need to check if previous is really previous
    // if not we need to reset to what the parser says is the previous
    // from buffer
    if(p !== c ) parser.p = p;
    else p = parser.p;

    if(!c) break;

    if (clarinet.DEBUG) console.log(i,c,clarinet.STATE[parser.state]);
    parser.position ++;
    if (c === "\n") {
      parser.line ++;
      parser.column = 0;
    } else parser.column ++;
    switch (parser.state) {

      case S.BEGIN:
        if (c === "{") parser.state = S.OPEN_OBJECT;
        else if (c === "[") parser.state = S.OPEN_ARRAY;
        else if (c !== '\r' && c !== '\n' && c !== ' ' && c !== '\t') 
          error(parser, "Non-whitespace before {[.");
      continue;

      case S.OPEN_KEY:
      case S.OPEN_OBJECT:
        if (c === '\r' || c === '\n' || c === ' ' || c === '\t') continue;
        if(parser.state === S.OPEN_KEY) parser.stack.push(S.CLOSE_KEY);
        else {
          if(c === '}') {
            emit(parser, 'onopenobject');
            emit(parser, 'oncloseobject');
            parser.state = parser.stack.pop() || S.VALUE;
            continue;
          } else  parser.stack.push(S.CLOSE_OBJECT);
        }
        if(c === '"') parser.state = S.STRING;
        else error(parser, "Malformed object key should start with \"");
      continue;