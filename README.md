<div align=center>

# react-input-handler

⚡️ Utility function to handle input changes in React based on [React's handling multiple input docs](https://reactjs.org/docs/forms.html#handling-multiple-inputs).

</div>

## Features

  - Package size is: 1.42KB (0.7KB gzipped!).
  - Supports all `<input />`s, checkboxes and `<select />`.
  - Supports `<select multiple />`.
  - Supports checkboxes with same via [array notation](#array-notation).
  - Multiple bundles: [CJS, ESM and UMD](dist).

## Installation

```shell
yarn add react-input-handler
```

or 

```shell
npm install react-inpu-handler --save
```

## Usage

Two things needs to be done to use **react-input-handler**:

  1. Create a bound function (see 2nd line in constructor).
  2. Attach the bound function to `onChange` events.

### Example

```js
import React from 'react'
import ReactInputHandler from 'react-input-handler'

class Form extends React.Component {

  constructor(props) {
    super(props)
    this.inputHandler = ReactInputHandler.bind(this)
    this.handleSubmit.bind(this)
  }

  render() {
    return (
      <form>
        <label>Fullname:</label>
        <input type="text" name="fullname" onChange={this.inputHandler} />
        
        <label>Biography:</label>
        <textarea type="text" name="bio" onChange={this.inputHandler} />
        
        <label> Are you a developer?</label>
        <input type="checkbox" name="developer" value="yes" onChange={this.inputHandler} />
        
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    // Output: { fullanme: "string", bio: "string", developer: true|false }
  }

}
```

## Documentation

**React-input-handler** is a single function which accept an unique argument: an event.

The objective is simple: handle input changes and persist them into the component's state.

### Array notation

By default, **react-input-handler** handles checkbox as boolean value. Sometimes, we may want two or more checkboxes to be handled as an array sharing the same `name` attribute. To achieve this we have to suffix the `name` attribute with `[]`. For example:

**Before:**

```js
  <input type="checkbox" name="one" value="1"   onChange={this.inputHandler} checked />
  <input type="checkbox" name="two" value="2"   onChange={this.inputHandler} />
  <input type="checkbox" name="three" value="3" onChange={this.inputHandler} checked />
  // state: { one: true, two: false, three: true }
```

**After:**

```js
  <input type="checkbox" name="numbers[]" value="1" onChange={this.inputHandler} checked />
  <input type="checkbox" name="numbers[]" value="2" onChange={this.inputHandler} />
  <input type="checkbox" name="numbers[]" value="3" onChange={this.inputHandler} checked />
  // state: { numbers: ["1", "3"] }
```

## Development

  1. Clone and fork this repo.
  2. Install dependencies running: `yarn` or `npm install`.
  3. [Run tests](#test).
  4. Prepare a pull request.

### Test

  - `yarn test` - to run all tests.
  - `yarn test -- --watch` to run all tests in watch mode.

### Publish

  1. Bump version: `npm version x.x.x -m 'Version %s.'`.
  2. Publish to NPM registry: `npm publish`.
  3. Publish the new created tag: `git push origin --tags`.


---

<div align=center>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT license](LICENSE)

</div>
