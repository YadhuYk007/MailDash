import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import colors from '../../constants/colors';
import NativeImapModule from '../../utils/ImapModule/NativeImapModule';
import {useDispatch, useSelector} from 'react-redux';
import {resetApp} from '../../redux/rootReducer';
import {ONBOARDING} from '../../constants/screennames';
import styles from './styles';
import strings from '../../constants/strings';
import Header from './components/Header';
import CarouselScroll from './components/Carousel';
import Card from './components/Card';

const Home = ({navigation}) => {
  const email = useSelector<any>(state => state.user.mailid);
  const password = useSelector<any>(state => state.user.appPassword);
  const [count, setCount] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getMail();
    const backAction = () => {
      Alert.alert(strings.exit_app, strings.exit_confirm, [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            setCount(0);
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const getMail = async () => {
    try {
      const host = 'imap.gmail.com';
      const username = email;
      const oauthToken = password;

      //fetching mail count using custom Turbo Module created using JavaMail API with IMAP protocol.
      const emails = await NativeImapModule.getEmails(
        host,
        username,
        oauthToken,
      );
      setCount(emails);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error fetching emails:', error);
    }
  };

  const onLogoutPress = () => {
    Alert.alert(
      strings.logout,
      strings.logout_confirm,
      [
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate(ONBOARDING);
            dispatch(resetApp());
          },
        },
        {text: 'No', onPress: () => {}},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.parent}>
      <Header
        onLogoutPressed={() => {
          onLogoutPress();
        }}
      />
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <CarouselScroll />
          <Card email={email} count={count} onRefresh={() => getMail()} />
        </View>
      )}
    </View>
  );
};

export default Home;
