import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { home, setting, search, kalp, chat } from '../../assets/icons';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomTabs = () => {
  const route = useRoute(); // Mevcut ekranın bilgisini alıyoruz
  const currentRouteName = route.name; // Geçerli ekran ismini alıyoruz

  // Navigasyon işlemleri
  const navigation = useNavigation();

  // Tab'a basıldığında hangi ekrana yönlendirileceğini belirliyoruz
  const handleTabPress = (screen) => {
    navigation.navigate(screen);  // Tıklanan ekrana yönlendiriyoruz
  };

  // Ana sayfa isminin 'Home' olduğundan emin olun
  return (
    <View style={styles.bottomtab}>
      <TouchableOpacity onPress={() => handleTabPress('home')}>
        <Image
          style={[
            styles.resim,
          ]}
          source={home}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('search')}>
        <Image
          style={[
            styles.resim,
          ]}
          source={search}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{
          width: 70,
          height: 70,
          borderRadius: 35, // Yuvarlak çerçeve için tam ortalama
          backgroundColor: "white",
          borderWidth: 1, // Çerçeve kalınlığı
          borderColor: "rgba(0, 0, 0, 0.5)", // Hafif siyah çerçeve
          alignItems: "center",
          justifyContent: "center",
          bottom:30
        }} onPress={()=>navigation.navigate("Chat")}>
        <Image style={{ width: 50, height: 50 }} source={chat} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('like')}>
        <Image
          style={[
            styles.resim,
          ]}
          source={kalp}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('Setting')}>
        <Image
          style={[
            styles.resim,
          ]}
          source={setting}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;
