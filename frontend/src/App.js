import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import Stock from './pages/Stock'
import StockBuy from './pages/StockBuy'
import StockSell from './pages/StockSell'
import Bonds from './pages/Bonds'
import Forward from './pages/Forward'
import PDF from './services/PDF'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/stock' component={Stock}/>
        <Route exact path="/stock/buy/:symbol" component={StockBuy}/>
        <Route exact path="/stock/sell/:symbol" component={StockSell}/>
        <Route exact path="/forward/:symbol" component={Forward}/>
        <Route exact path="/bonds" component={Bonds}/>
        <Route exact path="/letter" component={PDF}/>
      </Switch>
    </Router>
  );
}

export default App;
