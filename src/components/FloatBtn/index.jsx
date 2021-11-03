import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDeleted } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

const FloatBtn = ({ type }) => {
	const dispatch = useDispatch();

	const handleNewEvent = () => {
		dispatch(uiOpenModal());
  };
  
  const handleDeleteEvent = () => {
    dispatch(eventStartDeleted());
  }

	return (
		<>
			{type === 'add' && (
				<button className='btn-float  btn-floatAdd' onClick={handleNewEvent}>
					<i className='fas fa-plus'></i>
				</button>
			)}
			{type === 'delete' && (
				<button className='btn-float' onClick={handleDeleteEvent}>
					<i className='fas fa-trash-can'></i>
				</button>
			)}
		</>
	);
};

export default FloatBtn;
