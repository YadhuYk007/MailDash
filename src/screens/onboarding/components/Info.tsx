import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../constants/colors';
import strings from '../../../constants/strings';
import styles from './styles';
import Toast from 'react-native-toast-message';

const Info = ({onContinuePress}) => {
  const [mailID, setMailID] = useState('');

  const validateAndContinue = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(mailID);
    valid
      ? onContinuePress(mailID)
      : Toast.show({
          type: 'error',
          text1: strings.invalid_mail,
          position: 'top',
          visibilityTime: 2000,
        });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Text style={styles.infoTitle}>{strings.info_title}</Text>
      <View style={styles.line} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 16}}>
        <Text style={styles.subTitle}>{strings.two_fa_title}</Text>
        <Text style={styles.steps}>{strings.two_fa}</Text>
        <Text style={styles.subTitle}>{strings.app_password_title}</Text>
        <Text style={styles.steps}>{strings.app_password}</Text>
        <Text style={styles.consent}>{strings.consent}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          placeholder="Enter your email id"
          style={styles.input}
          onChangeText={setMailID}
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity
          disabled={mailID.length == 0}
          activeOpacity={0.8}
          style={
            mailID.length == 0
              ? [styles.button, {backgroundColor: 'grey', borderColor: 'grey'}]
              : styles.button
          }
          onPress={() => {
            validateAndContinue();
          }}>
          <Text style={styles.buttonText}>{strings.accept_nd_continue}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Info;
