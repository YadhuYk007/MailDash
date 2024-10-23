import React, {useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {HOME} from '../../constants/screennames';
import Info from './components/Info';
import {useDispatch} from 'react-redux';
import {setLoginState, setPassword, setUserMail} from '../../redux/configSlice';
import strings from '../../constants/strings';
import colors from '../../constants/colors';
import styles from './styles';

const Signup = ({navigation}) => {
  const [appPassword, setAppPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://accounts.google.com/');
  const webviewRef = useRef(null);
  const hasExecuted = useRef(false);
  const passwordRef = useRef('');
  const [accepted, setAccepted] = useState(false);
  const dispatch = useDispatch();

  const handleMessage = event => {
    const message = event.nativeEvent.data;

    if (
      message &&
      message !== 'Button not found' &&
      message !== 'Input field not found' &&
      message !== 'Password div not found' &&
      message !== 'Button element not found'
    ) {
      if (!appPassword && !userEmail) {
        setUserEmail(message);
      } else {
        setAppPassword(message);
        passwordRef.current = message;
        setIsLoading(false);
        dispatch(setPassword(passwordRef.current));
        dispatch(setUserMail(userEmail));
        dispatch(setLoginState(true));
        navigation.navigate(HOME);
      }
    } else {
      console.log('Error message:', message);
    }
  };

  const onNavigationStateChange = navState => {
    if (
      navState.url.includes('https://myaccount.google.com/signinoptions/twosv')
    ) {
      setIsLoading(false);
    }
    if (
      navState.url.includes('https://myaccount.google.com/') &&
      !hasExecuted.current
    ) {
      setIsLoading(true);
      setCurrentUrl('https://myaccount.google.com/apppasswords');
    }
  };

  //Javascript injection for auto enabling 2FA incase its disabled and auto generating App-Passwords
  const injectedJavaScript = `
    (function() {
      if (!window.hasRunOnce) {
        window.hasRunOnce = true;

        // Check if the URL includes "https://accounts.google.com/v3/signin"
        if (window.location.href.includes('https://accounts.google.com/v3/signin')) {
          console.log("Sign-in page detected");

          // Set the mail ID directly to the input field
          const emailInput = document.querySelector('input[type="email"]');
          if (emailInput) {
            emailInput.value = '${userEmail}'; // Use dynamic email from React state
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
            console.log("Email input filled");

            // Simulate the click event on the button with the provided class
            const buttonElement = document.querySelector('button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.BqKGqe.Jskylb.TrZEUc.lw1w4b');
            if (buttonElement) {
              setTimeout(function() {
                buttonElement.click(); // Simulate click on the button element
                console.log("Next button clicked");
              }, 1000); // Delay to ensure email input is filled before click
            } else {
              window.ReactNativeWebView.postMessage('Button element not found');
            }
          } else {
            window.ReactNativeWebView.postMessage('Email input field not found');
          }
        }

        // Handling the 2-Step Verification page
        if (window.location.href.includes('https://myaccount.google.com/signinoptions/twosv')) {
          console.log("2FA page detected");

          // Check if button exists
          const twoStepButton = document.querySelector('button.UywwFc-LgbsSe.UywwFc-LgbsSe-OWXEXe-dgl2Hf.wMI9H');
          if (twoStepButton) {
            setTimeout(() => {
              twoStepButton.click(); // Click the button to enable 2FA
              console.log("2FA button clicked");
              
              // Redirect to App Password page after enabling 2FA
              setTimeout(() => {
                window.location.href = 'https://myaccount.google.com/apppasswords';
              }, 2000);
            }, 1000);
          } else {
            window.ReactNativeWebView.postMessage('2FA button not found');
          }
        }

        // Continue with the app password flow
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
              window.location.href = 'https://myaccount.google.com/signinoptions/twosv'; // Redirect to 2FA if input field not found
            }
          }
        }, 3000); // Wait for the page to load
      }
    })();
  `;

  return (
    <SafeAreaView style={{flex: 1}}>
      {!accepted && (
        <Info
          onContinuePress={mail => {
            setUserEmail(mail);
            setAccepted(true);
          }}
        />
      )}
      {!appPassword && accepted && (
        <WebView
          ref={webviewRef}
          source={{uri: currentUrl}}
          injectedJavaScript={injectedJavaScript}
          onMessage={handleMessage}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{flex: 1}}
          incognito
        />
      )}
      {isLoading && !currentUrl.includes('signinoptions/twosv') && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loadingText}>{strings.please_wait}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Signup;
