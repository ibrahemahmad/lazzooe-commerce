import {Link, useHistory, useLocation, withRouter} from "react-router-dom";
import {Button, Tooltip} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

const NavBar = (props) => {
    const history = useHistory();


    const routeToPage = (path) => {
        props.history.push(`/${path}`);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container my-1">
                <Tooltip title="back">
                    <Button type="link" shape="default" icon={<ArrowLeftOutlined/>} size="large"
                            style={{color: "#fff"}}
                            onClick={history?.goBack}
                    />
                </Tooltip> <Link to={"/"} className="navbar-brand">Lezzoo e-commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item ">

                            <a className="nav-link" data-bs-toggle="collapse"
                               data-bs-target=".navbar-collapse.show"
                               onClick={() => routeToPage("")}>Home</a>

                        </li>
                        <li className="nav-item ">

                            <a className="nav-link" data-bs-toggle="collapse"
                               data-bs-target=".navbar-collapse.show"
                               onClick={() => routeToPage("stores")}>Stores</a>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse"
                               data-bs-target=".navbar-collapse.show"
                               onClick={() => routeToPage("categories")}>Categories</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse"
                               data-bs-target=".navbar-collapse.show"
                               onClick={() => routeToPage("products")}
                            >Products</a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    );
};
export default withRouter(NavBar);