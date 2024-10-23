import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../constants/colors';
import {fetch} from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {HOME, SIGNUP} from '../../constants/screennames';
import styles from './styles';
import strings from '../../constants/strings';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const Onboarding = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const checkConnectionAndLogin = () => {
    setLoading(true);
    fetch().then(state => {
      console.log(state);
      if (state.isConnected && state.type != 'vpn') {
        setLoading(false);
        navigation.navigate(SIGNUP);
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: strings.check_internet,
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
    });
  };

  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={{alignItems: 'center', flex: 0.9, justifyContent: 'center'}}>
        <Text style={styles.title}>{strings.app_name}</Text>
        <Text style={styles.info}>{strings.app_quote}</Text>
      </View>
      <View style={{flex: 0.1}}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={checkConnectionAndLogin}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={styles.buttonText}>{strings.get_started}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
