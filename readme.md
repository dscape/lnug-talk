I don't have a talk per se, but we can talk about streaming JSON parsing iff you find that interesting. I can show how clarinet works, how I would like an abstraction on top of it to be, other alternatives and why they are good or bad. People in the community seem to center the attention on this topic on me so I have plenty of good resources to show for 10m or so :) I think attendees would learn a little about this topic, and I think it's going to be a growing concern when people realize that no matter how fast JSON.parse is it is blocking their apps.

# I have nothing better to do so I'm listening to this guy talk about developing streaming JSON parsers in javascript

* Why not just use JSON Parse? The why I need to know about this section?
  * In reality you probably don't need to know about it.
  * You should use JSON.parse
    * It's faster
    * But blocking. and blocking is bad in node.
    * Doesn't do async (streaming or cb)
* How to use a parser in node
* How to write a json parser in javascript
  * [SAX Like][clarinet]
    * Have it work in the browser means no buffers #FFFUUUUU
  * [Each Level Pop][jsonparse] by Tim Caswell
  * [Hacking it with JSON.parse][maciej] By Maciej Malecki
* How to use a streaming JSON parser in node
* Making this simple to use
  * Based on this github [issue]
* Performance tricks on a node JSON streaming parser
  * How to debug node apps and make them faster
    * Look at this [talk]
    
[talk]: https://mkw.st/p/gdd11-berlin-v8-performance-tuning-tricks/#1
[clarinet]: http://github.com/dscape/clarinet
[jsonparse]: https://github.com/creationix/jsonparse
[maciej]: https://gist.github.com/1827416
[issue]: https://github.com/thejh/node-jsos/issues/2 