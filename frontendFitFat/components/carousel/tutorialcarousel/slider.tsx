import { StyleSheet, Text, View, FlatList, ViewToken, Platform, Dimensions} from "react-native";
import React, { useState, useRef, useMemo, useEffect} from "react";
import { ImageSlider,ImageSliderType } from "@/placeholderData/data";
import SliderItem from "../../carousel/tutorialcarousel/sliderItem";
import Animated,{ useAnimatedScrollHandler, useSharedValue, useAnimatedRef, useDerivedValue, scrollTo} from "react-native-reanimated";
import Pagination from "./pagination";


type props ={
  itemList: ImageSliderType[]
}

const { width } = Dimensions.get('window');


const Slider = ({ itemList }: props) => {

  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(itemList);
  const itemListRef = useRef(itemList);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0)

  
  const onsScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
      
      if (Platform.OS === 'web') {
        const newIndex = Math.round(e.contentOffset.x / width);
        setPaginationIndex(newIndex % itemList.length);
      }
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    itemListRef.current = itemList;
    if (isAutoPlay == true) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width
      }, 3000);

    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    }
  }, [itemList, isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);

  })

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const viewabilityConfigCallbackPairs = useMemo(() => {
    if (Platform.OS === 'web') return [];

    return [{
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged: ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems[0]?.index != null) {
          setPaginationIndex(viewableItems[0].index % itemListRef.current.length);
        }
      }
    }];
  }, []); // Dependências vazias = referência estável

  return (
    <View>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(item, index) => `sliderItem-${index}`}
        renderItem={({item, index})=> (
          <SliderItem item={item} index={index} scrollX={scrollX}/>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onsScrollHandler}
        removeClippedSubviews={false} //if this is enabled the other items will not be rendered
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        onEndReached={()=> setData([...data, ...itemList])}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true);
        }}
      />
      <Pagination itens={itemList} paginationIndex={paginationIndex} scrollX={scrollX} />

    </View>

  )
}

export default Slider

const styles= StyleSheet.create({
});

//28:53