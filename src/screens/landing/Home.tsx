import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import colors from '../../constants/colors';
import NativeImapModule from '../../utils/ImapModule/NativeImapModule';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import {resetApp} from '../../redux/rootReducer';
import {ONBOARDING} from '../../constants/screennames';

const Home = ({navigation}) => {
  const email = useSelector(state => state.user.mailid);
  const password = useSelector(state => state.user.appPassword);
  const [count, setCount] = useState('0');
  const [refreshing, setRefreshing] = useState(false);
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const images = [
    require('../../assets/image1.jpg'),
    require('../../assets/image2.jpg'),
    require('../../assets/image3.jpg'),
    require('../../assets/image3.jpg'),
    require('../../assets/image3.jpg'),
    require('../../assets/image3.jpg'),
  ];

  useEffect(() => {
    setRefreshing(true);
    getMail();
  }, []);

  const getMail = async () => {
    try {
      const host = 'imap.gmail.com';
      const username = email;
      const oauthToken = password;
      const emails = await NativeImapModule.getEmails(
        host,
        username,
        oauthToken,
      );
      setCount(emails);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.error('Error fetching emails:', error);
    }
  };

  const onLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Logging out will clear all the data, Do you wish to proceed?', // <- this part is optional, you can pass an empty string
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
    <View style={{flex: 1, padding: 16, backgroundColor: colors.white}}>
      <View style={{flex: 0.4}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: colors.black, fontWeight: '600', fontSize: 18}}>
            Maildash
          </Text>
          <TouchableOpacity
            onPress={() => {
              onLogoutPress();
            }}>
            <Text style={{color: 'red', fontWeight: '400', fontSize: 14}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Carousel
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={images}
          scrollAnimationDuration={1000}
          renderItem={(
            {item}, // Render each image
          ) => <Image source={item} style={{width: 100, height: 50}} />}
        /> */}
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
            backgroundColor: colors.black,
          }}>
          <Text style={{color: colors.white, fontSize: 18, fontWeight: '500'}}>
            {`Total Mail Count : ${count}`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setRefreshing(true);
              getMail();
            }}>
            {refreshing ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={{color: colors.white}}>Refresh</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
