'use strict'

export default handler

function handler(event) {

  if (!event) {
    throw new Error('event must be defined')
  }

  if (typeof event !== 'object') {
    throw new Error('event must be an object')
  }

  if (typeof this.setState !== 'function') {
    throw new Error('react-input-handler must be bound to the component instance')
  }

  const target = event.target
  const name = target.name

  if (!name) {
    throw new Error('all input must have a name prop')
  }

  this.setState({
    [name]: getValue(target)
  })

}

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
