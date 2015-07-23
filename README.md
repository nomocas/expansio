# expansio

Yet Another minimalistic but quite fast string expansion (or string interpolation) tool.

Extracted from [deepjs](https://github.com/deepjs/deepjs) core lib.

Micro sized : 594 Bytes minified/gzipped.

Whole-in-one AMD, CommonJS or global module.

- no new Function(...)
- pipe operator for disjonctions
- accept immediate string surrounded by ''
- concatenation between operands (variable or immediate string) with '+' operator
- variable paths are resolved (aka my.nested.property)

```javascript
var interpolated = expansio.interpolate("hello { name }", { name:"John" }); 
// hello John
```


```javascript
var interpolated = expansio.interpolate("hello { title | 'dear ' + name } - { address.zip }", { title:null, name:"Mary", address:{ zip:1000 } });
// hello dear Mary - 1000
```


## Tests

## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright (c) 2015 Gilles Coomans <gilles.coomans@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
