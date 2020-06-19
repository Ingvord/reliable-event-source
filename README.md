[![Docs](https://img.shields.io/badge/Docs-Generated-green.svg)](https://ingvord.github.io/reliable-event-source/)

# reliable-event-source
Reliable EventSource

## usage

```js
import {ReliableEventSource} from '';

const rev = new ReliableEventSource('http://localhost:8080/server/event-stream', {withCredentials: true}/*enable cors*/, 3000/*reconnection delay*/)
rev.observe()//returns rxjs/Observable
    .subscribe(msg => console.log(msg))

rev.observe('special')
    .subscribe(msg => console.log(msg))
```

## runtime dependencies

These dependencies must be resolved at runtime:

```js
rxjs
```
