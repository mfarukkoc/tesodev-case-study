import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewRecordPage from "./pages/NewRecordPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/result">
          <ResultPage />
        </Route>
        <Route exact path="/new-record">
          <NewRecordPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
