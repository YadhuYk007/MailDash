import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import strings from '../../../constants/strings';

const Header = ({onLogoutPressed}) => {
  return (
    <View style={{flex: 0.1}}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{strings.dashboard}</Text>
        </View>
        <TouchableOpacity onPress={onLogoutPressed}>
          <Text style={styles.logoutText}>{strings.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
