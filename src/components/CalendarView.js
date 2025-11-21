import React from 'react';
import { Calendar } from 'react-native-calendars';

export default function CalendarView({ selectedDate, onDayPress }) {
  return (
    <Calendar
      onDayPress={day => onDayPress(day.dateString)}
      markedDates={{
        [selectedDate]: { selected: true, selectedColor: '#4B7BE5' },
      }}
    />
  );
}
