import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const errorAlert = (errorMessage) => {
	Swal.fire({
		title: 'Error :(',
		text: errorMessage,
		icon: 'error',
		confirmButtonText: 'Let me try again!',
		confirmButtonColor: '#F01341',
	});
};

export default errorAlert;
