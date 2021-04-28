import s from './App.module.scss'
import { Header } from './components/Header/Header'
import { Trends } from './components/Trends/Trends'
import { Search } from './components/Search/Search'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { About } from './components/About/About'
import { memo } from 'react'
import { Saved } from './components/Saved/Saved'

const App: React.FC = memo(() => {
  return (
    <div className={s.app}>
      <Header />
      <main className={s.main}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={'/search'} />} />
          <Route path="/search" render={() => <Search />} />
          <Route path="/trends" render={() => <Trends />} />
          <Route path="/saved" render={() => <Saved />} />
          <Route path="/about/:aboutID?" render={() => <About />} />
          <Route exact path="*" render={() => <Redirect to={'/search'} />} />
        </Switch>
      </main>
    </div>
  )
})

export const MoviesApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
}