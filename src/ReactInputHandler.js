'use strict'

import set from 'lodash.set'

/**
 * Export React Input Handler.
 */

export default handler

/**
 * The React Input Handler function.
 * @param {Object} event The event.
 * @param {Function} callback The callback function.
 */
function handler(event, callback) {

  if (!event) {
    throw new Error('event must be defined')
  }

  if (typeof event !== 'object') {
    throw new Error('event must be an object')
  }

  if (typeof this.setState !== 'function') {
    throw new Error('react-input-handler must be bound to the component instance')
  }

  if (typeof callback === 'undefined' && typeof callback !== 'function') {
    throw new Error('the 2nd argument of react-input-handler must be a function')
  }

  const target = event.target
  const name = target.name

  if (!name) {
    throw new Error('all input must have a name prop')
  }

  // If the name prop ends with `[]` then the prop is an array.
  const usingArrayNotation = name.substr(-2) === '[]'

  if (usingArrayNotation) {
    const arrayNotationName = name.substr(0, name.length - 2)
    const adding = getValue(target)
    const array = this.state[arrayNotationName] || []
    const value = target.value

    // Add the target value to the array.
    if (adding) {

      // Add the new value to the array and persist into the state.
      if (array.indexOf(value) === -1) {
        this.setState((prevState) => ({
          [arrayNotationName]: array.concat(value)
        }))
      }
    } else {

      // Remove the target value from the array.
      const indexToRemove = array.indexOf(value)
      if (indexToRemove > -1) {
        array.splice(indexToRemove, 1)
      }

      // Persist the changed array into the state.
      this.setState(prevState => (
        set(prevState, arrayNotationName, array)
      ), callback)
    }
  } else {

    // Modify the state.
    this.setState(prevState => (
      set(prevState, name, getValue(target))
    ), callback)
  }
}

/**
 * Utility functions.
 */

/**
 * Return the value of a DOM element.
 * @param {Object} element The element.
 * @param {Boolean|String} The DOM element value.
 */
function getValue(element) {
  switch(element.type) {
    case 'checkbox':
      return element.checked
    case 'select-multiple':
      return [ ...element.querySelectorAll(':checked') ]
        .map((checked) => checked.value)
    default:
      return element.value
  }
}
