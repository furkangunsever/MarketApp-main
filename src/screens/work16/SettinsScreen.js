// screens/SettingsScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.text_contein}>
        <Text style={styles.title}>Ayarlarım</Text>
      </View>
      <Text style={styles.sectionTitle}>Hesap Detayları</Text>

      {/* Hesap Detayları Butonları */}
      <CustomButton
        text="Kişisel Bilgilerim"
        onPress={() => navigation.navigate('ProfileScreen')} // 'RoutesNames.PROFİLEPAGE' yerine doğrudan ekran adı kullanıldı
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
      <CustomButton text="Çıkış" onPress={() => console.log('Çıkış')} />

      {/* Hakkında Butonları */}
      <Text style={styles.sectionTitle}>Hakkında</Text>
      <CustomButton text="Hakkında" onPress={() => console.log('Hakkında')} />
      <CustomButton
        text="Uygulamayı Değerlendir"
        onPress={() => console.log('Uygulamayı Değerlendir')}
      />
      <CustomButton
        text="Kişisel Verilerin Korunması"
        onPress={() => console.log('Kişisel Verilerin Korunması')}
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
