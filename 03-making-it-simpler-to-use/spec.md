# Jesus this is complicated. I need help!

## dscape

Personally I think that, just like in http routing, all these advanced constructs will eventually just made code harder to read and more cumbersome. We (software developers) like to create smart regex and smart routes that do everything, but that does nothing to make the code clearer and more maintainable, plus it sometimes it introduces bugs cause we were too clever.

Better simple than clever.

This is what I would propose:

* Each route is a route, and will be checked independently. No `|` or `&` or any kind of logic in routes
* We use dot donation for each step. e.g. `a.b` or `a.0` (array).
* Optionally the user can provide an array as opposed to dot notation e.g. `['a', 'b']` for `a.b`
* What is returned is the last element of a path expression. e.g. `a.b.c` for `{"a": {"b": {"c": {"foo": "bar"}}}}` should return `{"foo": "bar"}`
* We use `*` as a recursive find, meaning any level that has a child of. e.g. `a.*.c` and `*.c` for  `{"a": {"b": {"c": {"foo": "bar"}}}}` both return `{"foo": "bar"}`
* We use colon to do simple one step routes. e.g. `:package.author`. This makes it easier to differentiate from wildcards, plus you can get the name of the capture groups


Rewriting the clarinet npmtop example should be something like:

```js
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
```

Then again this is your project and you should make the calls. Also many of the things I said might not apply or make this too slow, but this was just a first thinking about how a high level streaming api should look like.

Lets try to circulate this with @mikeal @substack @isaacs @dominictarr @creationix and @maxogden to see what they think, since they  are also interested in the topic.

## Paolo

```
We use dot donation for each step. e.g. a.b or a.0 (array).
```
Using dot notation where a segment is an integer is very awkward. I would use bracket notation for this for example `a[0]`, it also keeps the learning curve down.

```
Optionally the user can provide an array as opposed to dot notation e.g. ['a', 'b'] for a.b
```

i'd stick with one or the other. complexity will compound. do one thing well.

```
We use * as a recursive find, meaning any level that has a child of. e.g. a.*.c and *.c for {"a": {"b": {"c": {"foo": "bar"}}}} both return {"foo": "bar"}
```

there are some interesting ideas on how to manage this in EventEmitter2. Using an N-ary tree.

```
We use colon to do simple one step routes. e.g. :package.author. This makes it easier to differentiate from wildcards, plus you can get the name of the capture groups
```

I should be able to specify the operator for something like `:package.author` by providing it in the ctor.

@dscape said he knows there is selector support in clarinet for `a` in `{a:1,b:1,c:1}` that does:

```
a -> emit 1
b -> ignore
c -> ignore
end
```

this is great but obviously for this example this should be

```
a -> emit 1
end
```

He's implemented this in `feature/selector` branch. check it out in case we dont already do this out of the box. this is like dramatic for performance. imagine npm and selecting the first package... 0.003s.. :)
