import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";


const NavBar = () => {

	const { name } = useSelector(state => state.auth)
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(startLogout())
	}
	
	return (
		<nav className='navbar'>
			<span className='navbar-brand'>{name}</span>
			<button className='sign-out' onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
				<span>Salir</span>
			</button>
		</nav>
	);
};

export default NavBar;