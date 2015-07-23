# c3po

Extracted from [deepjs](https://github.com/deepjs/deepjs) core lib.
Previously named deep-protocols.

c3po is a lightweight (2.4 Ko minified, less than 1.0 Ko minified/gzipped) protocols manager which focus on providing easy way to write isomorphic code that need to retrieve dependant resources.

## Main idea

Imagine a modern web app where the client needs to retrieve data from server (ajax call). The server which in turn needs to retrieve data from DB (db driver call) or FS (nodejs fs api call) to fullfill the request to the client.

In fact, from client or server point of vue : it's the same resource. Only the way to talk to it differ with environnement :
- client needs ajax client (with headers, optional body shape, ...) that talk to server...
- and server needs fs/db/... drivers (with credentials/roles management, specific cwd, ...) 

If we want to write some code that do that __independently__ from client or server, without changing the code that retrieve and use the resource, you need to provide an abstraction layer which hides details of real calls and provides homogeneous, environnement agnostic, way to read resource.

Ideally, you ask resources, you get it, you work on it, and maybe you send something somewhere, __without to know__ if you're on client or server.

That is isomorphic code.

c3po is there to help us in that quest.


## Protocol methods

### Methods arguments

## Interpolation

## Native protocols

### dummy

### js

AMD and CommonJS environnement only.

## Promise A+ compliance

## Simple init

```javascript
c3po.protocols.foo = {
  init:function(){
      // do what you want
  },
  get:function(req, opt){
    return "you say : " + req;
  }
};

var result = c3po.get("foo::bar"); 
// => "you say : bar"
```


## Concurrent asynchrone lazzy init 

```javascript
c3po.protocols.foo = {
  init:function(){
      return new Promise(function(resolve, reject){
        resolve(true);
      });
  },
  get:function(req, opt){
    return { foo:(req + "-zoo") };
  }
};

c3po.get("foo::bar")
.then(function(s){
  console.log("success : ", s); // { foo:"bar-zoo" }
})
.catch(function(e){
  console.log("error : ", e);
});
```

## Contextualised protocols

As C-3PO, sometimes it's necessary to use contextualised protocols to remain fully diplomatic... ;)

### Promise Glocal protocols namespace

### OCM manager as protocol


## Dedicated protocols

### Restful Services and RQL

### Static resource loader
#### Template loader

#### JSON loader


## Request Cache management

## Tests

## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright (c) 2015 Gilles Coomans <gilles.coomans@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.