
import React from 'react';

import { Platform,Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import Filters from '../screens/FiltersScreen'
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FiltersScreen from '../screens/FiltersScreen';


const defaultStackNavOptions={
        headerStyle: {
            backgroundColor: Platform.OS === 'android' 
            ? Colors.primaryColor : ''
        },
        headerTitleStyle:{
            fontFamily:'open-sans-bold',
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}


const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: { title: 'Meal Categories' }
    },
    CategoryMeals: {
        screen: CategoryMealScreen,
    },
    MealDetail: MealDetailScreen
}, {
    mode:'modal',
    defaultNavigationOptions:defaultStackNavOptions
});

const FavNavigator= createStackNavigator({
    Favorites:FavoritesScreen,
    MealDetail:MealDetailScreen
},{defaultNavigationOptions:defaultStackNavOptions});

const tabScreenConfig={
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-restaurant'
                    size={30}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel:Platform.OS==='android'?
            <Text style={{fontFamily:'open-sans-bold'}}>
                Meals
                </Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
         navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-star'
                    size={30}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel:Platform.OS==='android'?
            <Text style={{fontFamily:'open-sans-bold'}}>
                Favorites
                </Text> : 'Favorites'
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig,{
        activeColor: 'white',
        shifting:true
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            labelStyle:{
                fontFamily:'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
        }
    });

    const FiltersNavigator= createStackNavigator( 
        {Filters:FiltersScreen},
        {
            navigationOptions:{
                drawerLabel: 'Filter Meals'
            },
            defaultNavigationOptions:defaultStackNavOptions})
    const MainNavigator= createDrawerNavigator({
        MealFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions:{
                drawerLabel:'Meals'
            }
        },
        Filters:FiltersNavigator
    },{
        contentOptions:{
            activeTintColor:Colors.accentColor,
            labelStyle:{
                fontFamily:'open-sans-bold'
            }
        }
    });



export default createAppContainer(MainNavigator);