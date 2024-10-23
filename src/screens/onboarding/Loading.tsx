import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import {HOME, ONBOARDING} from '../../constants/screennames';

const Loading = ({navigation}) => {
  const loggedIn = useSelector(state => state.user.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate(HOME);
    } else {
      navigation.navigate(ONBOARDING);
    }
  }, []);
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default Loading;
