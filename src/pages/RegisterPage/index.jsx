import { useDispatch } from 'react-redux';
import { startRegister } from '../../actions/auth';
import {useForm} from '../../hooks/useForm'
import errorAlert from '../../helpers/errorAlert';
import { Link } from 'react-router-dom';


const RegisterPage = () => {

	const dispatch = useDispatch();

	const initialForm = {
		name: '',
    email: '',
		password: '',
		repeatPassword: '',
	}
	
	const [formValues, handleInputChange] = useForm(initialForm);
	const { name, email, password, repeatPassword } = formValues;
	
	const handleRegister = (e) => {
		e.preventDefault();
		if (password !== repeatPassword) {
			return errorAlert('Password must match')
		}
		dispatch(startRegister(name, email, password));
	}

	return (
		<div className='container-background'>
			<div className='circle-container'>
				<div className='float-circle circle1'></div>
				<div className='float-circle circle2'></div>
			</div>
			<div className='login-container'>
				<div className='register-form'>
					<h3>Sign up</h3>
					<form onSubmit={handleRegister}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Name'
								name="name"
								value={name}
								onChange={handleInputChange} />
						</div>
						<div className='form-group'>
							<input
								type='email'
								className='form-control'
								placeholder='Email'
								name="email"
								value={email}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								name="password"
								value={password}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Repeat Password'
								name='repeatPassword'
								value={repeatPassword}
								onChange={handleInputChange}
							/>
						</div>

						<input type='submit' className='btnSubmit' value='Create account' />
					</form>
					<p className='redirectToLogin'>Do you already have an account? <Link to='/'>Log in</Link></p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
