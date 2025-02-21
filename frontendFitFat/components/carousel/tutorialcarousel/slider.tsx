import { StyleSheet, View, FlatList, ViewToken, Platform, Dimensions } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { ImageSliderType } from "@/placeholderData/carouselData";
import SliderItem from "../../carousel/tutorialcarousel/sliderItem";
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useAnimatedRef, 
  useDerivedValue, 
  scrollTo 
} from "react-native-reanimated";
import Pagination from "./pagination";

type Props = {
  itemList: ImageSliderType[];
};

const { width } = Dimensions.get('window');


const Slider = ({ itemList }: Props) => {

  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(itemList);
  const itemListRef = useRef(itemList);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const offset = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (scrollEvent) => {
      scrollX.value = scrollEvent.contentOffset.x;
      offset.value = scrollEvent.contentOffset.x;
      
      if (Platform.OS === 'web') {
        const newIndex = Math.round(scrollEvent.contentOffset.x / width);
        setPaginationIndex(newIndex % itemList.length);
        ref.current?.scrollToOffset({
          offset: newIndex * width,
          animated:true,
        });
      }
    },
    onMomentumEnd: (scrollEvent) => {
      offset.value = scrollEvent.contentOffset.x;
    },
  });

  useDerivedValue(() => {
    if (Platform.OS === 'web') {
      ref.current?.scrollToOffset({ 
        offset: offset.value, 
        animated: true 
      });
    } else {
      // Método Nativo
      scrollTo(ref, offset.value, 0, true);
    }
  });
  // 2. Lógica de auto-play corrigida
  useEffect(() => {
    const handleAutoPlay = () => {
      const maxOffset = width * (data.length - 1); // Índices começam em 0!
      const newOffset = offset.value + width;
  
      if (newOffset > maxOffset) {
        offset.value = 0; // Reinicia no final
      } else {
        offset.value = newOffset; // Avança normalmente
      }
    };
  
    let intervalId: NodeJS.Timeout;
    if (isAutoPlay) {
      intervalId = setInterval(handleAutoPlay, 3000);
    }
  
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlay, data.length, width, offset]);

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
  }, []);

  const styles = StyleSheet.create({
    webContainer: {
      overflowX: 'hidden', // Esconde scrollbars indesejadas
    },
  });

  return (
    <View style = {Platform.OS === 'web' ? styles.webContainer : {}}>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(item, index) => `sliderItem-${index}`}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        removeClippedSubviews={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        onEndReached={() => setData([...data, ...itemList])}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
          if (Platform.OS === 'web') {
            offset.value = scrollX.value;
            }
          }
        }
        onScrollEndDrag={() => {
          setIsAutoPlay(true)
          }
        }
        scrollEventThrottle={Platform.OS === 'web' ? 0 : 16}
      />
      <Pagination 
        itens={itemList} 
        paginationIndex={paginationIndex} 
        scrollX={scrollX} 
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});