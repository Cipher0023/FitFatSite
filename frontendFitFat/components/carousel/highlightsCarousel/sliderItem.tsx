import { StyleSheet,Text,View } from "react-native";
import React from 'react'
import { ImageSliderType } from "@/placeholderData/data";


type Props = {
    item: ImageSliderType;
    index: number;

}

const SliderItem = ({item,index}: Props) => {
    return (
        <View>
            <Text>{item.title}</Text>
        </View>
    )
}

export default SliderItem

const styles = StyleSheet.create({


})