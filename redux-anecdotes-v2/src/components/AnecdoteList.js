import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const {
    voteForAnecdote,
    notify,
    visibleAnecdotes
  } = props

  const vote = (anecdote) => async () => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes+1
    }
    voteForAnecdote(newAnecdote)
    notify(`you voted for '${anecdote.content}'`)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter inputRef={input => input && input.focus()}/>
      {visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.toLowerCase()
    .includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)  // sort by votes
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { voteForAnecdote, notify }
)(AnecdoteList)
