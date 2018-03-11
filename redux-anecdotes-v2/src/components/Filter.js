import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    props.setFilter(e.target.value
      .replace(/^\s+/, '')    // remove prepending spaces
      .replace(/\s+/g, ' '))  // replace multiple spaces with one
  }

  return (
    <div>
      <input
        ref={props.inputRef}
        type="text"
        placeholder="Filter anecdotes"
        onChange={handleChange}
      />
    </div>
  )
}

export default connect(
  null,
  { setFilter }
)(Filter)