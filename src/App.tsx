import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import NewRecordPage from "./pages/new-record-page/NewRecordPage";
import ResultPage from "./pages/result-page/ResultPage";

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
