import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Hakkimizda = () => {
  return (
    <ScrollView style={styles.container}>
      

      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.description}>
            El Akçe uygulaması, kullanıcıların zincir marketlerdeki ürün
            fiyatlarını anlık olarak karşılaştırabilecekleri ve yapay zeka
            destekli bir öneri sistemi aracılığıyla ihtiyaçlarına en uygun
            ürünleri bulmalarını sağlayacak bir mobil uygulama geliştirmeyi
            amaçlamaktadır.
          </Text>

          <Text style={styles.description}>
            Çalışmanın özgün değeri, mevcut fiyat karşılaştırma araçlarının
            ötesine geçerek kullanıcıların alışveriş alışkanlıklarını analiz
            eden ve kişisel ihtiyaçlarına göre öneriler sunan bir sistem
            oluşturmasıdır.
          </Text>

          <Text style={styles.description}>
            Bu sayede kullanıcılar, düzenli olarak satın aldıkları ürünlerde
            fiyat avantajlarından haberdar olacak ve bütçelerine en uygun
            alışveriş deneyimini yaşayacaklardır.
          </Text>

          <Text style={styles.description}>
            Ayrıca, yapay zeka destekli bu öneri sistemi sayesinde
            kullanıcıların alışveriş alışkanlıkları analiz edilecek ve onlara
            özel teklifler sunulacaktır. Böylece, kullanıcıların yalnızca anlık
            fiyat avantajları sağlaması değil, aynı zamanda düzenli alışveriş
            ihtiyaçlarını karşılamada ekonomik olarak daha bilinçli davranmaları
            sağlanacaktır.
          </Text>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.version}>Versiyon 1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000053',
    marginLeft: 10,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
    textAlign: 'justify',
  },
  versionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
});

export default Hakkimizda;
