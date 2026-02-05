import { ThemeProvider } from "./context/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./components/layout/Dashboard";
import Main from "./components/layout/Main";
import { getMainRoutes } from "./utils/routes";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {getMainRoutes().map((route) =>
            route.dashboard ? (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Dashboard>
                    <route.component />
                  </Dashboard>
                }
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isLanding ? (
                    <route.component />
                  ) : (
                    <Main>
                      <route.component />
                    </Main>
                  )
                }
              />
            ),
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
