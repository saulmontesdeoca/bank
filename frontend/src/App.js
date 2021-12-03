import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import Stock from './pages/Stock'
import StockBuy from './pages/StockBuy'
import StockSell from './pages/StockSell'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/stock' component={Stock}/>
        <Route exact path="/stock/buy/:symbol" component={StockBuy}/>
        <Route exact path="/stock/sell/:symbol" component={StockSell}/>
      </Switch>
    </Router>
  );
}

export default App;
