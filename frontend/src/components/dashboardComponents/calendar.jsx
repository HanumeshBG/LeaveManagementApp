import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay: (date) => date.getDay(),
  locales,
});

const CalendarEvents = () => {
  const [events, setEvents] = useState([
    {
      title: "Sample Event",
      start: new Date(2025, 1, 16, 10, 0), // February 16, 2025, 10:00 AM
      end: new Date(2025, 1, 16, 12, 0),
    },
  ]);

  const handleSelectEvent = (event) => {
    alert(`Event selected: ${event.title}`);
  };

 
  return (
    <div>
      <h1>React Big Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

export default CalendarEvents;