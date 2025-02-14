import { StyleSheet, Text, View,FlatList, useWindowDimensions} from "react-native";
import React, {useRef,useState} from "react";
import { ImageSlider } from "@/placeholderData/data";
import SliderItem from "./sliderItem";



const Slider = () => {

  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = () => {
    if (currentIndex < ImageSlider.length - 1) {
      const newIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      setCurrentIndex(newIndex);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      setCurrentIndex(newIndex);
    }
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  return (

    <View>
        <FlatList
          ref={flatListRef}
          data={ImageSlider}

          renderItem={({item, index}) => ( 

          <SliderItem 
            item={item}
            index={index}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          )}

          horizontal
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
          onScroll={handleScroll}

          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}


        />
    </View>

  )
}

export default Slider

const styles = StyleSheet.create({})