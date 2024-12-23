import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { bluee } from '../../assets/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Göz ikonu için
import auth from '@react-native-firebase/auth';

const Page2 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlük durumu

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      Alert.alert('Hata', 'E-posta ve şifre boş olamaz!');
      return;
    }

    auth()
      .signInWithEmailAndPassword(trimmedUsername, trimmedPassword)
      .then(() => {
        Alert.alert('Başarılı', 'Giriş başarılı!');
        navigation.navigate('home'); // Page6 sayfasına yönlendir
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Hata', 'Kullanıcı bulunamadı!');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Hata', 'Yanlış şifre!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Hata', 'Geçersiz e-posta formatı!');
        } else {
          Alert.alert('Hata', 'Bir hata oluştu: ' + error.message);
        }
      });
  };

  return (
    <ImageBackground source={bluee} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>EL AKÇE</Text>

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none" // Otomatik büyük harf kapalı
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifre"
            secureTextEntry={!showPassword} // Şifre görünürlüğünü kontrol et
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'} // Göz ikonunu değiştir
              size={25}
              color="#000053"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Giriş Yap Butonu */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Kayıt Ol Butonu */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('kayit')}>
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Görüntüyü kapsayacak şekilde boyutlandırır
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 46,
    marginBottom: 15,
    color: '#000053',
    fontFamily: 'Roboto-Italic',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#ffffffaa',
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#ffffffaa',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    color: '#000',
  },
  eyeIcon: {
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: '#000053',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#ffffff',
    borderColor: '#000053',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButtonText: {
    color: '#000053',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Page2;