import { StyleSheet, View, FlatList, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import React, {useRef,useState} from "react";
import { ImageSlider, ImageSliderType} from "@/placeholderData/data";
import SliderItem from "./sliderItem";
import Animated,{
  useSharedValue,
  useAnimatedScrollHandler,
  withTiming,
  useAnimatedRef,
} from "react-native-reanimated"

type Props ={
  itemList: ImageSliderType[]
}



const Slider = ({itemList}: {itemList: ImageSliderType[]}) => {

  const { width: screenWidth } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const aref = useAnimatedRef<FlatList>();

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const navigateToIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= itemList.length) return;
    setCurrentIndex(newIndex);
    scrollX.value = withTiming(newIndex * screenWidth, { duration: 500 });
    aref.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };
  
  const handleNext = () => navigateToIndex(currentIndex + 1);

  const handlePrevious = () => navigateToIndex(currentIndex - 1);

  return (

    <View>
      <Animated.FlatList
        ref={aref}
        data={itemList}
        renderItem={({ item, index }) => (
          <SliderItem
            item={item}
            index={index}
            scrollX={scrollX}
            screenWidth={screenWidth}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    top: '50%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 30,
  },
});

export default Slider;