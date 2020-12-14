# filewatcher

[![Build Status](https://travis-ci.org/fgnass/filewatcher.png?branch=master)](https://travis-ci.org/fgnass/filewatcher)

Simple wrapper around `fs.watch` that works around the [various issues](https://github.com/joyent/node/search?q=fs.watch&type=Issues)
you have to deal with when using the Node API directly.

More precisely filewatcher …
* always reports file names (for all events on all OSes)
* works well with editors that perform atomic writes (save & rename) like Sublime Text or vim
* doesn't fire twice when files are saved
* falls back to `fs.watchFile` when running out of file handles
* has no native dependencies
* uses Node's async APIs under the hood

This module is used by [node-dev](https://npmjs.org/package/node-dev)
and [instant](https://npmjs.org/package/instant).

### Usage

```js
var filewatcher = require('filewatcher');

var watcher = filewatcher();

// watch a file
watcher.add(__filename);

// ... or a directory
watcher.add(__dirname);

watcher.on('change', function(file, stat) {
  console.log('File modified: %s', file);
  if (!stat) console.log('deleted');
});
```

To stop watching, you can remove either a single file or all watched files at once:
```js
watcher.remove(file)
watcher.removeAll()
```

#### Notify users when falling back to polling

When the process runs out of file handles, _filewatcher_ closes all watchers and transparently switches to `fs.watchFile` polling. You can notify your users by listening to the `fallback` event:

```js
watcher.on('fallback', function(limit) {
  console.log('Ran out of file handles after watching %s files.', limit);
  console.log('Falling back to polling which uses more CPU.');
  console.log('Run ulimit -n 10000 to increase the limit for open files.');
});
```

### Options

You can pass options to `filewatcher()` in order to tweak its internal settings. These are the defaults:

```js
// the default options
var opts = {
  forcePolling: false,  // try event-based watching first
  debounce: 10,         // debounce events in non-polling mode by 10ms
  interval: 1000,       // if we need to poll, do it every 1000ms
  persistent: true      // don't end the process while files are watched
};

var watcher = filewatcher(opts)
```

### The MIT License (MIT)

Copyright (c) 2013-2016 Felix Gnass

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
