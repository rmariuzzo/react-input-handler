import React from 'react'

import InputHandler from '../src/ReactInputHandler'

function createForm(element, props, children) {

  class Form extends React.Component {

    constructor(props) {
      super(props)
      this.inputHandler = InputHandler.bind(this)
      this.state = {}
    }

    render() {
      return (
        <form>
          {React.createElement(element, {
            ...props,
            onChange: this.inputHandler,
          }, typeof children === 'function' ? children.call(this) : children )}
        </form>
      )
    }
  }

  return <Form />
}

export {
  createForm
}
