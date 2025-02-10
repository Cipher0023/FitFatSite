"use client"

import type React from "react"
import { useState, useRef } from "react"
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native"

const { width } = Dimensions.get("window")
const ITEM_WIDTH = width / 5

interface CarouselProps {
  data: Array<{ id: string; title: string }>
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  const renderItem = ({ item, index }: { item: { id: string; title: string }; index: number }) => (
    <TouchableOpacity
      style={[styles.item, index === activeIndex && styles.activeItem]}
      onPress={() => {
        setActiveIndex(index)
        flatListRef.current?.scrollToIndex({ index, animated: true })
      }}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  )

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollPosition / ITEM_WIDTH)
    setActiveIndex(index)
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={handleScroll}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  contentContainer: {
    paddingHorizontal: ITEM_WIDTH / 2,
  },
  item: {
    width: ITEM_WIDTH,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeItem: {
    backgroundColor: "#e0e0e0",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default Carousel