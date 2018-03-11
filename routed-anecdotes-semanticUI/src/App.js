import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Form, Button, Message, Menu, Grid, Divider, Header, Icon } from 'semantic-ui-react'
import bruce from './images/bruce_schneier.jpg'

const Navigation = () => (
  <Menu stackable size="large">
    <Menu.Item as={Header} color="pink">
      <Icon name="hand peace"/>
      Software anecdotes
    </Menu.Item>
    <Menu.Item name="home" as={NavLink} exact={true} to='/'>
      anecdotes
    </Menu.Item>
    <Menu.Item name="create" as={NavLink} exact={true} to='/create'>
      create new
    </Menu.Item>
    <Menu.Item name="about" as={NavLink} exact={true} to='/about'>
      about
    </Menu.Item>
  </Menu>
)

const Notification = ({ content }) => (
  <Message success>
    <p>{content}</p>
  </Message>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const Anecdotes = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              by {anecdote.author}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <Grid>
    <Grid.Column width={10}>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is &quot;a story with a point.&quot;</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Grid.Column>
    <Grid.Column width={2}>
      <img
        src={bruce}
        alt="kuva"
        title="Miksi minä olen tässä?"
        width="200"
        height="200"
      />
    </Grid.Column>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input
              name='content'
              value={this.state.content}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input
              name='author'
              value={this.state.author}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input
              name='info'
              value={this.state.info}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit" color="green">create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      activePage: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote '${anecdote.content}' created!`
    })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <Navigation/>
            {this.state.notification.length > 0
              ? <Notification content={this.state.notification}/>
              : null
            }
            <Route exact path="/" render={() =>
              <Anecdotes anecdotes={this.state.anecdotes} />
            }/>
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)}/>
            }/>
            <Route path="/create" render={({ history }) =>
              <CreateNew addNew={this.addNew} history={history}/>
            }/>
            <Route path="/about" render={() =>
              <About />
            }/>
            <Divider/>
            <Footer/>
          </div>
        </Router>
      </Container>
    )
  }
}

export default App
