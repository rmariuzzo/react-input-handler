'use strict'

import './requestAnimationFrame'

import React from 'react'
import Enzyme from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'

import InputHandler from '../src/ReactInputHandler'
import { createForm } from './utils'

Enzyme.configure({ adapter: new ReactSixteenAdapter() })

describe('react-input-handler', () => {

  it('persist <select /> changes into state when no option selected', () => {
    const form = Enzyme.mount(createForm('select', { name: 'number' }, (
      [
        <option key="0" value="none">Choose a number</option>,
        <option key="1" value="one">One</option>,
        <option key="2" value="two">Two</option>,
        <option key="3" value="three">Three</option>,
      ]
    )))

    form.find('select').simulate('change')
    expect(form.state('number')).toBe('none')
  })

  it('persist <select /> changes into state when a option is selected', () => {
    const form = Enzyme.mount(createForm('select', { name: 'test', defaultValue: 'one' }, (
      [
        <option key="0" value="none">Choose a number</option>,
        <option key="1" value="one">One</option>,
        <option key="2" value="two">Two</option>,
        <option key="3" value="three">Three</option>,
      ]
    )))

    form.find('select').simulate('change')
    expect(form.state('test')).toBe('one')
  })

  it('persist <select multiple /> changes into state when multiple options are selected', () => {
    const form = Enzyme.mount(createForm('select', { name: 'test', multiple: true, defaultValue: ['one', 'two'] }, (
      [
        <option key="0" value="none">Choose a number</option>,
        <option key="1" value="one">One</option>,
        <option key="2" value="two">Two</option>,
        <option key="3" value="three">Three</option>,
      ]
    )))

    form.find('select').simulate('change')
    expect(form.state('test')).toEqual(['one', 'two'])
  })

})
