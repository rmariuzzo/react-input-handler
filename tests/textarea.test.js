'use strict'

import './requestAnimationFrame'

import React from 'react'
import Enzyme from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'

import { createForm } from './utils'

Enzyme.configure({ adapter: new ReactSixteenAdapter() })

describe('react-input-handler', () => {

  it('persist <textarea /> changes into state', () => {
    const form = Enzyme.mount(createForm('textarea', {
      name: 'test',
      value: 'hello'
    }))

    form.find('textarea').simulate('change')
    expect(form.state('test')).toBe('hello')
  })

})
