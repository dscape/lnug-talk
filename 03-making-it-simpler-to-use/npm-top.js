var fs                 = require('fs')
  , jsos               = require('jsos') // reads jesus :D LOL
  , parse_stream       = jsos.createStream()
  , authors            = {}
  ;

parse_stream.on(':package', function (node, package_name) {
    var current_count = authors[node.author];
    if (current_count) authors[node.author] +=1;
    else               authors[node.author] = 1;
});

parse_stream.on('end', function () {
  var sorted = []
    , i
    ;
  for (var a in authors)
    sorted.push([a, authors[a]]);
  sorted.sort(function(a, b) { return a[1] - b[1]; });
  i = sorted.length-1;
  while(i!==-1) {
    console.log(sorted.length-i, sorted[i]);
    i--;
  }
});

fs.createReadStream(__dirname + '/npm.json').pipe(parse_stream);