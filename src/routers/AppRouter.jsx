import CalendarPage from '../pages/CalendarPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
} from 'react-router-dom';
import { useEffect } from 'react';
import { startChecking } from '../actions/auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {

	const dispatch = useDispatch();
	const {checking, uid} = useSelector(state => state.auth)
	useEffect(() => {
		dispatch(startChecking())
	}, [dispatch])

	if (checking) {
		return (<Spinner />)
	}
	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute exact path='/login' component={LoginPage} isAuthenticated={!!uid} />
					<PublicRoute exact path='/register' component={RegisterPage} isAuthenticated={!!uid}/>
					<PrivateRoute exact path='/' component={CalendarPage} isAuthenticated={!!uid}/>
					<Redirect to="/"/>
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
