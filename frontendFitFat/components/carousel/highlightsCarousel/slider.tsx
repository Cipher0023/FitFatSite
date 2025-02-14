import { StyleSheet, Text, View,FlatList} from "react-native";
import React from "react";
import { ImageSlider } from "@/placeholderData/data";
import SliderItem from "./sliderItem";

const Slider = () => {
  return (

    <View>
        <FlatList
          data={ImageSlider}
          renderItem={({item, index}) => ( 
          <SliderItem item={item} index={index}/>            
          )}
          horizontal
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
        />
    </View>

  )
}

export default Slider

const styles = StyleSheet.create({})