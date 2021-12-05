import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import Stock from './pages/Stock'
import StockBuy from './pages/StockBuy'
import StockSell from './pages/StockSell'
import Var from './pages/Var'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/stock' component={Stock}/>
        <Route exact path="/stock/buy/:symbol" component={StockBuy}/>
        <Route exact path="/stock/sell/:symbol" component={StockSell}/>
        <Route exact path="/forward/:symbol" component={StockBuy}/>
        <Route exact path="/var" component={Var}/>
        <Route exact path="/bonds" component={Var}/>

      </Switch>
    </Router>
  );
}

export default App;
