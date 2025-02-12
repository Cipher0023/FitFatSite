import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
    title: string;
    image: ImageSourcePropType;
    description: string;
};

export const ImageSlider = [

    {
        title: 'Ovos fritos',
        image: require('@/assets/images/dishesTemplate/friedEgg.png'),
        description: 'ovos fritos em salada'
    },
    {
        title: 'Comidas variadas',
        image: require('@/assets/images/dishesTemplate/mixedFoods.png'),
        description: 'Comida saudável e variada'
    },
    {
        title: 'Bifão com batatas',
        image: require('@/assets/images/dishesTemplate/steakPotatoes.png'),
        description: 'Suculento bife com batatas'
    },

]