import { StyleSheet,Text,View, Image, Dimensions, TouchableOpacity} from "react-native";
import React from 'react'
import { ImageSliderType } from "@/placeholderData/data";
import {LinearGradient} from 'expo-linear-gradient'
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";


type Props = {
    item: ImageSliderType;
    index: number;
    onNext: () => void;
    onPrevious: () => void;
};

const screenWidth = Dimensions.get('window').width;

const SliderItem = ({item,index, onNext, onPrevious}: Props) => {
  return (
    <View style={styles.itemContainer}>

      <Image source={item.image} style={styles.imageStile} />

      <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style = {styles.background}>

        <View style={{alignItems:'flex-end'}}>

          <View style={styles.controls}>

            <TouchableOpacity style={styles.icon} onPress={onPrevious}>
              <Ionicons name="arrow-back-circle-outline" size={24} color={'rgb(255, 255, 255)'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icon} onPress={onNext}>
              <Ionicons name="arrow-forward-circle-outline" size={24} color={'rgb(255, 255, 255)'} />
            </TouchableOpacity>

          </View>

        </View>

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

      </LinearGradient>
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({

  itemContainer:{
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    width:screenWidth,
    backgroundColor: Colors.light.test2
  },
  background:{
    position:'absolute',
    //height:screenWidth/3,
    height:300,
    //width:screenWidth-10,
    width:300,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  imageStile:{
    //width:screenWidth-10,
    width:300,
    height:300,
    //height:screenWidth/3,
    borderRadius:20
  },
  title:{
    color: 'rgb(255, 255, 255)',
    fontSize:18,

  },
  description:{
    color: 'rgb(255, 255, 255)',
    fontSize:10,
  },
  icon:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding:5,
    borderRadius:20,
    height:35
    
  },
  controls:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    position:'absolute',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.test3
  }


})