// Usando em packages.json o pacote react-router-dom :
// dependencies => react-router-dom na versao 5.2.0
// devDependencies => @Types/react-router-dom na versao 5.1.8
import {
  // BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import HomeView from './views/Home.view';
import CashFlowExpensesView from './views/CashFlowExpenses.view';
import CashFlowRevenuesView from './views/CashFlowRevenues.view';
import PaymentCreateView from './views/PaymentCreate.view';
import PaymentListView from './views/PaymentList.view';
import UserCreateView from './views/UserCreate.view';
import UserListView from './views/UserList.view';

export default function Routes() {
  return (
    // <BrowserRouter> // transferido para src/index.tsx para evitar erro
    <Switch>
      <Route path={'/'} exact component={HomeView} />
      <Route
        path={'/usuarios/cadastro'}
        exact
        component={UserCreateView}
      />
      <Route
        path={'/usuarios'}
        exact
        component={UserListView}
      />
      <Route
        path={'/pagamentos'}
        exact
        component={PaymentListView}
      />
      <Route
        path={'/pagamentos/cadastro'}
        exact
        component={PaymentCreateView}
      />
      <Route
        path={'/fluxo-de-caixa/despesas'}
        exact
        component={CashFlowExpensesView}
      />
      <Route
        path={'/fluxo-de-caixa/receitas'}
        exact
        component={CashFlowRevenuesView}
      />
    </Switch>
    // </BrowserRouter>
  );
}
