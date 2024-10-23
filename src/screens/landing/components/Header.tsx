import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import strings from '../../../constants/strings';

const Header = ({onLogoutPressed}) => {
  return (
    <View style={{flex: 0.1}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{strings.dashboard}</Text>
        <TouchableOpacity onPress={onLogoutPressed}>
          <Text style={styles.logoutText}>{strings.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
