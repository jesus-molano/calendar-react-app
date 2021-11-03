import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import {useForm} from '../../hooks/useForm'

const LoginPage = () => {

	const dispatch = useDispatch();

	const initialForm = {
		email: '',
		password: '',
	};

	const [formValues, handleInputChange] = useForm(initialForm);
	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLogin(email, password));
	};

	return (
		<div className='container-background'>
			<div className='circle-container'>
				<div className='float-circle circle1'></div>
				<div className='float-circle circle2'></div>
			</div>
			<div className='login-container'>
				<div className='login-form'>
					<h3>Sign in</h3>
					<form onSubmit={handleLogin}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Email'
								name='email'
								value={email}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								name='password'
								value={password}
								onChange={handleInputChange}
							/>
						</div>

						<input type='submit' className='btnSubmit' value='Login' />
					</form>
					<p className='redirectToRegister'>You do not have an account? <Link to='/register'>Register here</Link></p>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
