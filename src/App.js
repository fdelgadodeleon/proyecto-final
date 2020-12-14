import './App.css';

// router
import { Switch, Route } from 'react-router-dom';

//components
import Header from './modules/header/Header';
import Home from './modules/home/Home';
import Employees from './modules/employees/Employees';
import EmployeeFormWrapper from './modules/employees/EmployeeFormWrapper';
import Products from './modules/products/Products';
import Sales from './modules/sales/Sales';
import NotFound from './modules/notFound/NotFound';

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/employees/edit/:id" component={EmployeeFormWrapper} />
          <Route path="/employees/new" component={EmployeeFormWrapper} />
          <Route path="/employees" component={Employees} />
          <Route path="/products" component={Products} />
          <Route path="/sales" component={Sales} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
