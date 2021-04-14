import "./App.css";
import "antd/dist/antd.css"; 
import { BrowserRouter as MemoryRouter, Switch, Route } from "react-router-dom";
import { AccountContextProvider } from "./contexts";
import LayoutApp from "./containers/layout";
function App() {
  return (
    <>   
      <AccountContextProvider>
        <div className="App">
          <MemoryRouter>
            <Switch>
              <Route path="/" component={LayoutApp} /> 
            </Switch>
          </MemoryRouter>
        </div>
      </AccountContextProvider>
    </>
  );
}

export default App;
