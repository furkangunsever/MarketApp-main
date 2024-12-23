import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Page3 = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Hata', 'Yeni şifreler eşleşmiyor.');
      return;
    }

    try {
      const user = auth().currentUser;

      // Eski şifreyi yeniden doğrulama işlemi
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await user.reauthenticateWithCredential(credential);

      // Yeni şifre güncelleme
      await user.updatePassword(newPassword);
      Alert.alert('Başarılı', 'Şifreniz başarıyla güncellendi.');
      navigation.navigate('Page2'); // Giriş sayfasına yönlendirme
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Hata', 'Eski şifreniz yanlış.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Hata', 'Yeni şifre çok zayıf. Lütfen daha güçlü bir şifre deneyin.');
      } else if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Hata',
          'Şifre değiştirmek için yeniden giriş yapmanız gerekiyor.'
        );
      } else {
        Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifre Güncelle</Text>

      <TextInput
        style={styles.input}
        placeholder="Eski Şifre"
        placeholderTextColor="#888"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Yeni Şifre"
        placeholderTextColor="#888"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Yeni Şifreyi Tekrar Girin"
        placeholderTextColor="#888"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
        <Text style={styles.buttonText}>Şifre Güncelle</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Page2')}>
        <Text style={styles.linkText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Page3;