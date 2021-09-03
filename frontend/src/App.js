import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import Stock from './pages/Stock'
import StockInfo from './pages/StockInfo'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/stock' component={Stock}/>
        <Route exact path="/stock/:symbol" component={StockInfo}/>
      </Switch>
    </Router>
  );
}

export default App;
