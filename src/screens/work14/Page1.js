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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Göz ikonu için
import { bluee } from '../../assets/images';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Page1 = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlük durumu

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Hata', 'Tüm alanları doldurun!');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const { uid } = userCredential.user;

      // Firestore'a kullanıcı bilgilerini kaydet
      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          name: firstName,
          lastname: lastName,
          email: email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Başarılı', 'Kayıt başarıyla tamamlandı ve veritabanına eklendi!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Hata', 'Bu e-posta adresi zaten kullanılıyor!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Hata', 'Geçersiz e-posta adresi!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Hata', 'Şifre çok zayıf!');
      } else {
        Alert.alert('Hata', 'Bir sorun oluştu!');
      }
      console.error('Firebase Hatası:', error);
    }
  };

  return (
    <ImageBackground source={bluee} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>

        <TextInput
          placeholder="İsim"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Soyisim"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            secureTextEntry={!showPassword} // Şifre görünürlüğünü kontrol et
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'} // İkonu değiştir
              size={25}
              color="#000053"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: '#000053',
    fontFamily: 'Roboto-Italic',
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#ffffffaa',
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: '#ffffffaa',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#000',
  },
  eyeIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#000053',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Page1;