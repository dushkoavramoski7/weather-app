import {Route, Switch} from 'react-router-dom';
import WeatherView from "../views/WeatherView";

export const routesConfig = [
    {
        component: WeatherView,
        path: '/weather',
        title: 'Main weather view',
        exact: true
    },

]

const AllRoutes = () => {
    return (
        <Switch>
            {
                routesConfig.map(route =>
                    <Route key={route.path} path={route.path} exact component={route.component} />
                )
            }
        </Switch>
    )

}
export default AllRoutes;