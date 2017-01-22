import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

let username;
let password;

const renderLoginForm = ({ handleLogin, session }) => {

  if (!session.isNotLoggedIn) return null
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleLogin({username: username.value, password:password.value})}}>
      <input ref={n => {username = n}} type="text"/>
      <input ref={n => {password = n}} type="password"/>
      <button type="submit">Login</button>
    </form>
  )
}

const renderLoginMsg = ({ session }) => {
  if (session.isNotLoggedIn) {
    if (session.loginToken === 'invalid') {
      return <p>Invalid Login, please try again.</p>
    }
  }
  return null
}

export const Header = (props) => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={classes.activeRoute}>
      Counter
    </Link>
    {' · '}
    <Link to='/dashboard' activeClassName={classes.activeRoute}>
      Dashboard
    </Link>

    {renderLoginForm(props)}
    {renderLoginMsg(props)}
  </div>
)

export default Header
