import React from 'react'

import InputHandler from '../src/ReactInputHandler'

function createForm(element, props, children) {

  class Form extends React.Component {
    render() {
      return (
        <form>
          {React.createElement(element, {
            ...props,
            onChange: InputHandler.bind(this)
          }, children)}
        </form>
      )
    }
  }

  return <Form />
}

export {
  createForm
}
