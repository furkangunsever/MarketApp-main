import React, {useState, memo, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import BirthDatePicker from '../../components/BirthDatePicker/BirthDatePicker';
import {useNavigation} from '@react-navigation/native';
import {profil} from '../../assets/images';
import {user} from '../../assets/icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = memo(() => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  // Kullanıcı bilgilerini yükle
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            setName(userData.name || '');
            setSurname(userData.lastname || '');
            setPhone(userData.phone || '');
            setGender(userData.gender || '');
            setCity(userData.city || '');
            setDistrict(userData.district || '');
            // Doğum tarihi varsa ayarla
            if (userData.birthDate) {
              setDay(userData.birthDate.day || '');
              setMonth(userData.birthDate.month || '');
              setYear(userData.birthDate.year || '');
            }
          }
        })
        .catch(error => {
          console.error('Veri yükleme hatası:', error);
        });
    }
  }, []);

  // Güncelleme fonksiyonu
  const handleUpdate = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Hata', 'Kullanıcı oturumu bulunamadı!');
        return;
      }

      if (!name || !surname) {
        Alert.alert('Hata', 'Ad ve soyad alanları zorunludur!');
        return;
      }

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .update({
          name: name,
          lastname: surname,
          phone: phone,
          gender: gender,
          birthDate: {
            day: day,
            month: month,
            year: year,
          },
          city: city,
          district: district,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Başarılı', 'Bilgileriniz başarıyla güncellendi!');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      Alert.alert('Hata', 'Bilgiler güncellenirken bir hata oluştu!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profil Resmi */}
      <View style={styles.profilePicContainer}>
        <Image source={user} style={styles.profilePic} />
      </View>

      {/* Ad */}
      <Text style={styles.label}>Ad *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Adınızı girin"
        autoCapitalize="words"
      />

      {/* Soyad */}
      <Text style={styles.label}>Soyad *</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Soyadınızı girin"
        autoCapitalize="words"
      />

      {/* Telefon */}
      <Text style={styles.label}>Telefon</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Telefon numaranız"
        keyboardType="phone-pad"
      />

      {/* Cinsiyet */}
      <Text style={styles.label}>Cinsiyet</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => setGender('Kadın')}>
          <Text
            style={[styles.radio, gender === 'Kadın' && styles.radioSelected]}>
            Kadın
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Erkek')}>
          <Text
            style={[styles.radio, gender === 'Erkek' && styles.radioSelected]}>
            Erkek
          </Text>
        </TouchableOpacity>
      </View>
      <BirthDatePicker />

      {/* İl */}
      <Text style={styles.label}>İl</Text>
      <RNPickerSelect
        onValueChange={setCity}
        items={cities}
        placeholder={{label: 'İl Seçin', value: null}}
        style={pickerStyles}
      />

      {/* İlçe */}
      <Text style={styles.label}>İlçe</Text>
      <TextInput
        style={styles.input}
        value={district}
        onChangeText={setDistrict}
        placeholder="İlçenizi girin"
        autoCapitalize="words"
      />

      {/* Güncelle Butonu */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Güncelle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
});

// Dropdown Seçenekleri
const days = Array.from({length: 31}, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));
const months = [
  {label: 'Ocak', value: 'Ocak'},
  {label: 'Şubat', value: 'Şubat'},
  {label: 'Mart', value: 'Mart'},
  {label: 'Nisan', value: 'Nisan'},
  {label: 'Mayıs', value: 'Mayıs'},
  {label: 'Haziran', value: 'Haziran'},
];
const years = Array.from({length: 100}, (_, i) => ({
  label: `${1924 + i}`,
  value: `${1924 + i}`,
}));
const cities = [
  {label: 'Ankara', value: 'Ankara'},
  {label: 'İstanbul', value: 'İstanbul'},
  {label: 'Elazığ', value: 'Elazığ'},
  {label: 'İzmir', value: 'İzmir'},
  {label: 'Bursa', value: 'Bursa'},
  {label: 'Adana', value: 'Adana'},
  {label: 'Konya', value: 'Konya'},
  {label: 'Antalya', value: 'Antalya'},
  {label: 'Gaziantep', value: 'Gaziantep'},
  {label: 'Şanlıurfa', value: 'Şanlıurfa'},
  {label: 'Mersin', value: 'Mersin'},
  {label: 'Eskişehir', value: 'Eskişehir'},
  {label: 'Diyarbakır', value: 'Diyarbakır'},
  {label: 'Hatay', value: 'Hatay'},
  {label: 'Manisa', value: 'Manisa'},
  {label: 'Kahramanmaraş', value: 'Kahramanmaraş'},
  {label: 'Samsun', value: 'Samsun'},
  {label: 'Malatya', value: 'Malatya'},
  {label: 'Erzurum', value: 'Erzurum'},
  {label: 'Trabzon', value: 'Trabzon'},
  {label: 'Ordu', value: 'Ordu'},
  {label: 'Sakarya', value: 'Sakarya'},
  {label: 'Kocaeli', value: 'Kocaeli'},
];

// Picker Stilleri
const pickerStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 5,
  },
});

export default ProfileScreen;
