import {Route, BrowserRouter} from 'react-router-dom';
import Home from './Components/Home';
import filter from './Components/Filter';
import Restaurant from './Components/Restaurant';
import Header from './Components/Header';
import Cart from './Components/Cart';
import Transactions from './Components/Transactions';

const Router = () => {
    return (
        <BrowserRouter>
            <Header></Header>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/filter" component={filter} />
            <Route path="/restaurant" component={Restaurant} />
            <Route path="/cart" component={Cart} />
            <Route path="/transactions" component={Transactions} />
        </BrowserRouter>
    )
}

export default Router;