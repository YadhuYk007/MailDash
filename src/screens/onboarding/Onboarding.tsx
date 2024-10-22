import React, {useState} from 'react';
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
import {SIGNUP} from '../../constants/screennames';
import styles from './styles';
import strings from '../../constants/strings';

const Onboarding = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);

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
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{strings.app_name}</Text>
        <Text style={styles.info}>{strings.app_quote}</Text>
      </View>
      <View>
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
