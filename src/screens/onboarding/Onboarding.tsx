import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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

const Onboarding = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const loggedIn = useSelector(state => state.user.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate(HOME);
    }
  }, []);

  const checkConnectionAndLogin = () => {
    setLoading(true);
    fetch().then(state => {
      if (state.isConnected) {
        setLoading(false);
        navigation.navigate(SIGNUP);
      } else {
        Toast.show({
          type: 'info',
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
