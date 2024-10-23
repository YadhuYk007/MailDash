import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styles from '../styles';

const CarouselScroll = () => {
  const {width: screenWidth} = Dimensions.get('window');
  const images = [
    require('../../../assets/image1.jpg'),
    require('../../../assets/image2.jpg'),
    require('../../../assets/image3.jpg'),
    require('../../../assets/image4.jpg'),
    require('../../../assets/image5.jpg'),
    require('../../../assets/image6.jpg'),
  ];
  return (
    <View style={{flex: 0.3}}>
      <Carousel
        width={screenWidth}
        height={250}
        data={images}
        renderItem={({item}) => (
          <Image source={item} style={styles.image} resizeMode="cover" />
        )}
        loop
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 200,
          parallaxAdjacentItemScale: 0.7,
        }}
        autoPlay
        autoPlayInterval={3000}
        style={{padding: 16}}
      />
    </View>
  );
};

export default CarouselScroll;
