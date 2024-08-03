import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const localStorageEvents = JSON.parse(localStorage.getItem('calendarEvents'));

    if (!localStorageEvents || localStorageEvents.length === 0) {
      // Default events to populate local storage
      const defaultEvents = [
        {
          id: "12315",
          title: "All-day event",
          start: "2024-07-27",
          end: "2024-07-27",
          allDay: true,
        },
        {
          id: "5123",
          title: "Timed event",
          start: "2024-07-29T10:00:00",
          end: "2024-07-29T12:00:00",
          allDay: false,
        },
      ];

      localStorage.setItem('calendarEvents', JSON.stringify(defaultEvents));
      setCurrentEvents(defaultEvents);
    } else {
      setCurrentEvents(localStorageEvents);
    }
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      // Add event to calendar
      calendarApi.addEvent(newEvent);

      // Retrieve existing events and add the new one
      const existingEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
      if (!existingEvents.some(event => event.id === newEvent.id)) {
        existingEvents.push(newEvent);
        localStorage.setItem('calendarEvents', JSON.stringify(existingEvents));
      }

      // Update currentEvents state
      setCurrentEvents(existingEvents);
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      // Remove event from calendar
      selected.event.remove();

      // Remove event from local storage
      let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
      events = events.filter(event => event.id !== selected.event.id);
      localStorage.setItem('calendarEvents', JSON.stringify(events));

      // Update currentEvents state
      setCurrentEvents(events);
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={JSON.parse(localStorage.getItem('calendarEvents')) || []}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
