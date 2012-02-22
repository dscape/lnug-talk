# I have nothing better to do so I'm listening to this guy talk about developing streaming JSON parsers in javascript

* Why not just use JSON Parse? The why I need to know about this section?
  * In reality you probably don't need to know about it.
  * You should use JSON.parse
    * It's faster
    * But blocking. and blocking is bad in node.
    * Doesn't do async (streaming or cb)
* How to use a streaming JSON parser in node
* How to build your own a json parser in javascript
  * [SAX Like][clarinet]
    * Have it work in the browser means no buffers #FFFUUUUU
  * [Each Level Pop][jsonparse] by Tim Caswell
  * [Hacking it with JSON.parse][maciej] By Maciej Malecki
  * Performance for all, but I'm probably wrong
  * Ball is in your court Sir!
* Making it simple to use
  * Based on this github [issue]
* Performance tricks on a node JSON streaming parser
  * How to debug node apps and make them faster
    * Look at this [talk]
    
[talk]: https://mkw.st/p/gdd11-berlin-v8-performance-tuning-tricks/#1
[clarinet]: http://github.com/dscape/clarinet
[jsonparse]: https://github.com/creationix/jsonparse
[maciej]: https://gist.github.com/1827416
[issue]: https://github.com/thejh/node-jsos/issues/2 