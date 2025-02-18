import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { ImageSliderType } from '@/placeholderData/data'
import { SharedValue } from 'react-native-reanimated';

type Props = {
  itens: ImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;

}

const Pagination = ({itens,paginationIndex,scrollX}:Props) => {
  return (

    <View style={styles.container}>
      {itens.map((_,index)=>{
        return (
          <View 
            key={index} 
            style={[
              styles.dot, 
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