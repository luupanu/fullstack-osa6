import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.newAnecdote]
    case 'VOTE': {
      return state.map(anecdote => {
        return anecdote.id === action.newAnecdote.id ?
          action.newAnecdote :
          anecdote
      })
    }
    case 'INIT':
      return action.anecdotes
    default:
      return state
  }
}

// action creators

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      anecdotes
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE',
      newAnecdote
    })
  }
}

export default anecdoteReducer