// the im super lazy but fucking smart approach
var util = require('util')
  , Stream = require('stream')
  ;

var FastJSONStream = exports.FastJSONStream = function JSONStream(options) {
  this.bufferSize  = options.bufferSize;
  this._buffer     = new Buffer(this.bufferSize);
};

util.inherits(FastJSONStream, Stream);

FastJSONStream.prototype.write = function (chunk) {
  var data;

  chunk.copy(this._buffer, this._buffer.lenght);

  try {
    this.emit('data', JSON.parse(this._buffer));
    this._buffer = new Buffer(this.bufferSize);
  } catch (_) {}
};