import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import strings from '../../../constants/strings';

const Card = ({email, count, onRefresh}) => {
  return (
    <View style={styles.dashboardCard}>
      <Text style={styles.cardtitle}>{strings.mail_dashboard}</Text>
      <View style={styles.cardView}>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.cardRow}>
          <Text style={styles.count}>{`${strings.mail_count} : ${count}`}</Text>
          <TouchableOpacity onPress={() => onRefresh()}>
            <View style={styles.refreshView}>
              <Text style={styles.refresh}>{strings.refresh}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;
