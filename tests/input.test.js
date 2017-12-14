'use strict'

import './requestAnimationFrame'

import React from 'react'
import Enzyme from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'

import { createForm } from './utils'

Enzyme.configure({ adapter: new ReactSixteenAdapter() })

describe('react-input-handler', () => {

  it('persist <input /> changes into state', () => {
    const form = Enzyme.mount(createForm('input', {
      type: 'text',
      name: 'test',
      value: 'hello'
    }))

    form.find('input').simulate('change')
    expect(form.state('test')).toBe('hello')
  })

  it('persist <input /> changes into state using deep object traversal', () => {
    const form = Enzyme.mount(createForm('input', {
      type: 'text',
      name: 'a.b.c',
      value: 'hello'
    }))

    form.find('input').simulate('change')
    expect(form.state().a.b.c).toBe('hello')
  })

})
