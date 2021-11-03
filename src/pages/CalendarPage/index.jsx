import CalendarEvent from '../../components/CalendarEvent';
import CalendarModal from '../../components/CalendarModal';
import NavBar from '../../components/Navbar';
import FloatBtn from '../../components/FloatBtn';
import moment from 'moment';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages, momentES } from '../../config/languageES-SP';
import { uiOpenModal } from '../../actions/ui';
import { eventCleanActive, eventSetActive, eventStartLoading } from '../../actions/events';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';

moment.updateLocale('es', momentES);
const localizer = momentLocalizer(moment);

const CalendarPage = () => {

	const dispatch = useDispatch();

	const { events, activeEvent  } = useSelector((state) => state.calendar);
	const {uid} = useSelector(state => state.auth)

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);

	useEffect(() => {
		dispatch(eventStartLoading())
	}, [dispatch])

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		dispatch(eventCleanActive())
	}

	const onDoubleClick = () => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: ( uid === event.user._id ) ? '#F01341': '#465660',
			borderRadius: '0.6rem',
			display: 'block',
			color: '#fff',
		};
		return {
			style,
		};
	};

	return (
		<div className='calendar-page'>
			<NavBar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccesor='end'
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onView={onViewChange}
				onSelectEvent={onSelectEvent}
				onSelectSlot={ onSelectSlot }
				selectable={true}
				view={lastView}
				components={{
					event: CalendarEvent,
				}}
			/>
			<FloatBtn type={activeEvent ? 'delete' : 'add'} />
			<CalendarModal />
		</div>
	);
};

export default CalendarPage;
