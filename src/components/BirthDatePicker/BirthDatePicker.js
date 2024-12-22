import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BirthDatePicker = () => {
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2023');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  const years = Array.from({ length: 100 }, (_, i) => (2023 - i).toString());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Doğum Tarihi</Text>
      <View style={styles.pickerContainer}>
        {/* Gün Picker */}
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
          style={styles.picker}>
          {days.map((day) => (
            <Picker.Item label={day} value={day} key={day} />
          ))}
        </Picker>

        {/* Ay Picker */}
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={styles.picker}>
          {months.map((month) => (
            <Picker.Item label={month} value={month} key={month} />
          ))}
        </Picker>

        {/* Yıl Picker */}
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={styles.picker}>
          {years.map((year) => (
            <Picker.Item label={year} value={year} key={year} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  label: {
    marginTop:5,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    paddingHorizontal: 10,
    borderRadius:5,
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor:"white"
  },
});

export default BirthDatePicker;
