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
import {useNetInfo} from '@react-native-community/netinfo';

const Home = ({navigation}) => {
  const email = useSelector<any>(state => state.user.mailid);
  const password = useSelector<any>(state => state.user.appPassword);
  const [count, setCount] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {isConnected, type} = useNetInfo();

  useEffect(() => {
    console.log(`fetching mails`);
    setLoading(true);
    isConnected && getMail();
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
  }, [isConnected]);

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
      console.log(error?.message);
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
      {isConnected && type != 'vpn' ? (
        loading ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <CarouselScroll />
            <Card email={email} count={count} onRefresh={() => getMail()} />
          </View>
        )
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{color: colors.black, fontSize: 16}}>
            {strings.check_internet}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;
