'use strict'

/**
 * Make custom events and listeners.
 * @constructor
 */
function EventEmitter () {}
/**
 * Add listener like addEventListener.
 * @param  {String} event
 * @param  {Function} callback
 */
EventEmitter.prototype.on = function (event, callback) {
  if (!this.__events) {
    this.__events = {}
  }

  if (this.__events[event]) {
    this.__events[event].push(callback)
  } else {
    this.__events[event] = [callback]
  }
}

/**
 * Call listeners.
 *
 * @param  {String} event
 * @param  {Object} data
 */
EventEmitter.prototype.trigger = function (event, data) {
  if (this.__events && this.__events[event]) {
    this.__events[event].forEach(function (func) {
      func(data)
    })
  }
}

/**
 * Remove listener like removeEventListener.
 *
 * @param  {String} event
 * @param  {Function} callback
 */
EventEmitter.prototype.un = function (event, callback) {
  const callbackIndex = this.__events[event].indexOf(callback)
  if (callbackIndex >= 0) {
    this.__events[event].splice(callbackIndex, 1)
  }
}

export default EventEmitter
