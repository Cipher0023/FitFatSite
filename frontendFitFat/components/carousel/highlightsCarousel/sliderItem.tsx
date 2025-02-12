import { StyleSheet,Text,View, Image, Dimensions} from "react-native";
import React from 'react'
import { ImageSliderType } from "@/placeholderData/data";


type Props = {
    item: ImageSliderType;
    index: number;
}

const {width} = Dimensions.get('screen');

const SliderItem = ({item,index}: Props) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={{width:500, height:500 }}/>
      <Text>{item.title}</Text>
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({

  itemContainer:{
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    width:width


  }


})