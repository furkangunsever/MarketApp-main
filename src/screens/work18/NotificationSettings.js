import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bildirim Ayarları</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
          onPress={toggleCheckbox}
        >
          {isChecked && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
        <Text style={styles.label}>
          Takip ettiğim ürünlerin en ucuz fiyatı düştüğünde bildirim al
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#8e8e93',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default App;
