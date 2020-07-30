import React, { useState,useEffect,useCallback } from 'react';

import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';


const FilterSwitch = props => {
    return (<View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch value={props.state}
            trackColor={{ true: Colors.primaryColor }}
            thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
            onValueChange=
            {props.onChange} />
    </View>);
};

const FiltersScreen = props => {
    const {navigation}=props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

const dispatch=useDispatch();

    const saveFilters=useCallback(()=>{
        const appliedFilters={
            glutenFree:isGlutenFree,
            lactoseFree:isLactoseFree,
            vegan:isVegan,
            vegetarian:isVegetarian
        };
        dispatch(setFilters(appliedFilters));
    },[isGlutenFree,isLactoseFree,isVegan,isVegetarian,dispatch])

    useEffect(()=>{
        props.navigation.setParams({save: saveFilters});
    },[saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>
                Available Filter/Restricitions
                </Text>
            <FilterSwitch label='Gluten-free'
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)} />

            <FilterSwitch label='Lactose-free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)} />

            <FilterSwitch label='Vegan'
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)} />

            <FilterSwitch label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    )
};

FiltersScreen["navigationOptions"] = (navData) => {

    return {
        title: 'Filter Meals',
        headerLeft: () => <HeaderButtons
            HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu"
                iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>
        ,
        headerRight: () => <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Save"
            iconName='ios-save'
            onPress={navData.navigation.getParam('save')} />
    </HeaderButtons>
    };



}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'

    }
    ,
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical:20
    }
});

export default FiltersScreen;