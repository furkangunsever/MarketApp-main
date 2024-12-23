// screens/SettingsScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import auth from '@react-native-firebase/auth';

const SettingsScreen = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{name: 'giris'}],
      });
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.text_contein}>
        <Text style={styles.title}>Ayarlarım</Text>
      </View>
      <Text style={styles.sectionTitle}>Hesap Detayları</Text>

      {/* Hesap Detayları Butonları */}
      <CustomButton
        text="Kişisel Bilgilerim"
        onPress={() => navigation.navigate('ProfileScreen')}
      />
      <CustomButton
        text="Bildirim Ayarlarım"
        onPress={() => navigation.navigate('NotificationSettings')}
      />
      <CustomButton
        text="Şifremi Güncelle"
        onPress={() => console.log('Şifremi Güncelle')}
      />
      <CustomButton
        text="E-posta Adresimi Güncelle"
        onPress={() => console.log('E-posta Adresimi Güncelle')}
      />
      <CustomButton text="Çıkış" onPress={handleLogout} />

      {/* Hakkimizda Butonları */}
      <Text style={styles.sectionTitle}>Hakkımızda</Text>
      <CustomButton
        text="Hakkımızda"
        onPress={() => navigation.navigate('Hakkimizda')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text_contein: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginVertical: 10,
    marginLeft: 10,
    marginTop: 20,
  },
});

export default SettingsScreen;
