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
import ProductFormWrapper from './modules/products/ProductFormWrapper';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <header>
            <Header />
          </header>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/employees/new" component={EmployeeFormWrapper} />
              <Route path="/employees/edit/:id" component={EmployeeFormWrapper} />
              <Route path="/employees" component={Employees} />
              <Route path="/products/new" component={ProductFormWrapper} />
              <Route path="/products/edit/:id" component={ProductFormWrapper} />
              <Route path="/products" component={Products} />
              <Route path="/sales" component={Sales} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
