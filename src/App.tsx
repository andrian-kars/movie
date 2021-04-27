import s from './App.module.scss'
import { Header } from './components/Header/Header'
import { Trends } from './components/Trends/Trends'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const App: React.FC = () => {
  return (
    <div className={s.app}>
      <Header />
      <main className={s.main}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={'/trends'} />} />
          <Route path="/trends" render={() => <Trends />} />
          {/* <Route path="/dialogs/:userId?" render={() => <DialogsPage />} /> */}
          {/* <Route exact path="/users" render={() => <UsersPage />} /> */}
          {/* <Route exact path="*" render={() => <Suspense fallback={<Preloader />}><Page404 /></Suspense>} /> */}
        </Switch>
      </main>
    </div>
  )
}

export const MoviesApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
}