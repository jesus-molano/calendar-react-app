import { types } from '../types/types';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import errorAlert from '../helpers/errorAlert';
import { eventLogout } from './events';

export const startLogin = (email, password) => {
	return async (dispatch) => {
		const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			errorAlert(body.msg);
		}
	};
};

export const startRegister = (name, email, password) => {
	return async (dispatch) => {
		const resp = await fetchWithoutToken(
			'auth/register',
			{ name, email, password },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			errorAlert(body.msg);
		}
	};
};

export const startChecking = () => {
	return async (dispatch) => {
		const isCurrentToken = !!localStorage.getItem('token');

		if (!isCurrentToken) {
			dispatch(checkingFinish());
			return;
		}
		const resp = await fetchWithToken('auth/validate');
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			errorAlert(body.msg);
			dispatch(checkingFinish());
		}
	};
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
	type: types.authLogin,
	payload: user,
});

export const startLogout = () => {
	return (dispatch) => {
		localStorage.clear();
		dispatch(eventLogout())
		dispatch(logout());
	};
};

const logout = () => ({ type: types.authLogout });
