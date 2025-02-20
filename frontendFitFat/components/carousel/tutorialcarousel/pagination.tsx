import { View, Text, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import { ImageSliderType } from '@/placeholderData/data'
import Animated,{ SharedValue, useAnimatedStyle, interpolate, Extrapolation} from 'react-native-reanimated';

type Props = {
  itens: ImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
}

const{width} =Dimensions.get('window');

const Pagination = ({itens,paginationIndex,scrollX}:Props) => {
  return (

    <View style={styles.container}>
      {itens.map((_,index)=>{
        const pgAnimationStyle = useAnimatedStyle(()=>{
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP
          );
          return {
            width: dotWidth
          };
        });

        return (
          <Animated.View 
            key={index} 
            style={[
              styles.dot,
              pgAnimationStyle,
              {backgroundColor: paginationIndex === index ? '#222': '#aaa'},
            ]}
          />
        )
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  dot:{
    backgroundColor: '#aaa',
    height: 8,
    width: 8,
    marginHorizontal: 5,
    borderRadius: 8,
  }
})