import React, { useEffect } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Loader, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { EditTodo } from './components/EditTodo'
import { EditReward } from './components/EditReward'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'
import { Todos } from './components/Todos'
import { Rewards } from './components/Rewards'
import { provideAccount } from './state/accountState'

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

const App: React.FunctionComponent<AppProps> = ({ children, ...props }) => {
  const { auth } = props

  const handleLogin = () => auth.login()

  const handleLogout = () => auth.logout()

  const generateMenu = () => (
    <Menu>
      <Menu.Item name="home">
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
    </Menu>
  )

  const logInLogOutButton = () =>
    auth.isAuthenticated() ? (
      <Menu.Item name="logout" onClick={handleLogout}>
        Log Out
      </Menu.Item>
    ) : (
      <Menu.Item name="login" onClick={handleLogin}>
        Log In
      </Menu.Item>
    )

  const generateCurrentPage = () => {
    if (!auth.isAuthenticated()) {
      return <LogIn auth={auth} />
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={routeProps => <Rewards {...routeProps} auth={auth} />}
        />

        <Route
          path="/todos"
          exact
          render={routeProps => <Todos {...routeProps} auth={auth} />}
        />

        <Route
          path="/todos/:todoId/edit"
          exact
          render={routeProps => <EditTodo {...routeProps} auth={auth} />}
        />

        <Route
          path="/rewards/:rewardId/edit"
          exact
          render={routeProps => <EditReward {...routeProps} auth={auth} />}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }

  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={props.history}>
                {generateMenu()}
                {generateCurrentPage()}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}

export default provideAccount(App)
