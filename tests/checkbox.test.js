'use strict'

import './requestAnimationFrame'

import React from 'react'
import Enzyme from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'

import InputHandler from '../src/ReactInputHandler'
import { createForm } from './utils'

Enzyme.configure({ adapter: new ReactSixteenAdapter() })

describe('react-input-handler', () => {

  it('persist <input type="checkbox" /> changes into state', () => {
    const form = Enzyme.mount(createForm('div', {}, function() {
      return [
        <input type="checkbox" name="one" key="1" value="1" onChange={this.inputHandler} checked />,
        <input type="checkbox" name="two" key="2" value="2" onChange={this.inputHandler} />,
        <input type="checkbox" name="three" key="3" value="3" onChange={this.inputHandler} />,
      ]
    }))

    form.find('input').first().simulate('change')
    expect(form.state('one')).toBe(true)
  })

  it('persist <input type="checkbox" /> changes into state when using array notation', () => {
    const form = Enzyme.mount(createForm('div', {}, function() {
      return [
        <input type="checkbox" name="numbers[]" key="1" value="1" onChange={this.inputHandler} checked />,
        <input type="checkbox" name="numbers[]" key="2" value="2" onChange={this.inputHandler} />,
        <input type="checkbox" name="numbers[]" key="3" value="3" onChange={this.inputHandler} checked />,
      ]
    }))

    form.find('input').first().simulate('change')
    form.find('input').last().simulate('change')

    expect(form.state('numbers')).toEqual(['1', '3'])
  })

})
