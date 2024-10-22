import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import NativeImapModule from '../../utils/ImapModule/NativeImapModule';
import {HOME} from '../../constants/screennames';

const Signup = ({navigation}) => {
  const [appPassword, setAppPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://accounts.google.com/');
  const webviewRef = useRef(null);
  const hasExecuted = useRef(false);
  const passwordRef = useRef('');
  const getMail = async () => {
    try {
      const host = 'imap.gmail.com'; //IMAP host
      const username = 'yadhuyk007@gmail.com';
      const oauthToken = passwordRef.current;
      const emails = await NativeImapModule.getEmails(
        host,
        username,
        oauthToken,
      );
      navigation.navigate(HOME);
      console.log('Emails retrieved:', emails);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleMessage = event => {
    const message = event.nativeEvent.data;

    if (
      message &&
      message !== 'Button not found' &&
      message !== 'Input field not found' &&
      message !== 'Password div not found'
    ) {
      setAppPassword(message);
      passwordRef.current = message;
      setIsLoading(false);
      getMail();
    } else {
      console.log('Error message:', message);
    }
  };

  const onNavigationStateChange = navState => {
    if (
      navState.url.includes('https://myaccount.google.com/') &&
      !hasExecuted.current
    ) {
      setIsLoading(true);
      setCurrentUrl('https://myaccount.google.com/apppasswords');
    }
  };

  const injectedJavaScript = `
    (function() {
      if (!window.hasRunOnce) {
        window.hasRunOnce = true;
        setTimeout(function() {
          if (window.location.href.includes('https://myaccount.google.com/apppasswords')) {
            console.log("App Password page loaded");

            const input = document.getElementById('i6');
            if (input) {
              input.value = 'Maildash';
              input.dispatchEvent(new Event('input', { bubbles: true }));

              const button = document.getElementsByClassName('AeBiU-LgbsSe AeBiU-LgbsSe-OWXEXe-dgl2Hf wMI9H')[0];
              if (button) {
                button.click();

                setTimeout(() => {
                  const passwordDiv = document.querySelector('div[dir="ltr"]');
                  if (passwordDiv) {
                    let spans = passwordDiv.querySelectorAll('span');
                    let password = '';
                    spans.forEach(span => {
                      password += span.innerText;
                    });

                    window.ReactNativeWebView.postMessage(password); // Send the extracted password
                  } else {
                    window.ReactNativeWebView.postMessage('Password div not found');
                  }
                }, 2000);
              } else {
                window.ReactNativeWebView.postMessage('Button not found');
              }
            } else {
              window.ReactNativeWebView.postMessage('Input field not found');
            }
          }
        }, 3000);
      }
    })();
  `;

  return (
    <SafeAreaView style={{flex: 1}}>
      {!appPassword && (
        <WebView
          ref={webviewRef}
          source={{uri: currentUrl}}
          injectedJavaScript={injectedJavaScript}
          onMessage={handleMessage}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{flex: 1}}
        />
      )}
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Setting up your account...</Text>
        </View>
      )}
      {appPassword && (
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordText}>
            Generated App Password: {appPassword}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
    backgroundColor: 'white', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
  passwordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordText: {
    fontSize: 20,
    color: '#000',
  },
});

export default Signup;
