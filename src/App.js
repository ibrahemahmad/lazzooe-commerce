import './App.css';
import NavBar from "./component/navbar/NavBar";
import HomePage from "./component/HomePage";
import Categories from "./component/categories/Categories";
import Stores from "./component/stores/Stores";
import Products from "./component/products/Products";
import ProtectedRoute from "./component/routecomponent/ProtectRoute";
import {Switch} from "react-router-dom";

const App = () => {
    const routes = [
        {
            path: "/",
            exact: true,
            comp: () => <HomePage/>
        },
        {
            path: "/categories",
            exact: true,
            comp: () => <Categories/>
        },
        {
            path: "/stores",
            exact: true,
            comp: () => <Stores/>
        },
        {
            path: "/products",
            exact: true,
            comp: () => <Products/>
        }


    ];
    return (
        <div className="App" data-testid="app-element">
            <NavBar/>
            <div className="container-md mt-1">
                <Switch>
                    {routes.map((route, index) => (
                        <ProtectedRoute
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.comp}
                        />
                    ))}

                </Switch>
            </div>
        </div>
    );
}

export default App;
