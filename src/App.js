import "./App.css";
import Cart from "./components/Cart";
import Products from "./components/Products";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Products} />
        <Route path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  );
}
export default App;
