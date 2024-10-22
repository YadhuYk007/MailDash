import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../constants/colors';

const Home = () => {
  return (
    <View style={{flex: 1, padding: 16}}>
      <View style={{flex: 0.4}}>
        <View>
          <Text style={{color: colors.black, fontWeight: '600', fontSize: 16}}>
            Maildash
          </Text>
          <Text style={{color: colors.black, fontWeight: '600', fontSize: 16}}>
            Maildash
          </Text>
        </View>
      </View>
      <View style={{flex: 0.6}}>
        <Text style={{color: colors.black, fontSize: 16}}>
          Your Mail Dashboard
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingVertical: 24,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'grey',
            borderRadius: 12,
            marginVertical: 16,
          }}>
          <Text style={{color: colors.black, fontSize: 18, fontWeight: '600'}}>
            Total Mails : 455
          </Text>
          <TouchableOpacity>
            <Text>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
