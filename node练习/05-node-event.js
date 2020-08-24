var _events = require('events')

var _eventEmitter = new _events.EventEmitter();

_eventEmitter.on('fuck', function(){
    console.log('fuck society');
})

_eventEmitter.emit('fuck');

console.log(_eventEmitter);

