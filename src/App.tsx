import s from './App.module.scss'
import { Header } from './components/Header/Header'
import { HashRouter } from 'react-router-dom'

export const App: React.FC = () => {
  return (
    <HashRouter>
      <div className={s.app}>
        <Header />
      </div>
    </HashRouter>
  )
}