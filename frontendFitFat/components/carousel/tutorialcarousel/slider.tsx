import { StyleSheet, Text, View, FlatList, ViewToken} from "react-native";
import React, { useState, useRef } from "react";
import { ImageSlider,ImageSliderType } from "@/placeholderData/data";
import SliderItem from "../../carousel/tutorialcarousel/sliderItem";
import Animated,{ useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import Pagination from "./pagination";


type props ={
  itemList: ImageSliderType[]
}

const Slider = ({ itemList }: props) => {

  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);

  const onsScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;

    }
  })

  const onViewableItemsChanged = ({viewableItems}: {viewableItems: ViewToken[]}) => {
    if(viewableItems[0].index !== undefined && viewableItems[0].index !== null)
      setPaginationIndex(viewableItems[0].index);
  };
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged}
  ]);

  return (
    <View>
      <Animated.FlatList
        data={itemList}
        keyExtractor={(item, index) => `sliderItem-${index}`}
        renderItem={({item, index})=> (
          <SliderItem item={item} index={index} scrollX={scrollX}/>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onsScrollHandler}
        removeClippedSubviews={false} //if this is enabled the other items will not be rendered
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <Pagination itens={itemList} paginationIndex={paginationIndex} scrollX={scrollX} />

    </View>

  )
}

export default Slider

const styles= StyleSheet.create({
});

