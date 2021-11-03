import AppRouter from './routers/AppRouter'
import {Provider} from 'react-redux'
import { store } from './store'

const CalendarApp = () => {
  return (
    <Provider store= {store}>
      <AppRouter />
    </Provider>
  )
}

export default CalendarApp
