/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import ImageView from './imageView';
import GalleryView from './galleryView';
import HomePage from './homePage'
import { StackNavigator } from 'react-navigation';
import PlayLive from './playLive'
import PlayFullScreen from './playFullScreen'

import PlayLiveRadio from './playLiveRadio'
                                                   
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
    'u'
});

const AppNavigator = StackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions:()=>({                                                
            title:'Ab24',
             headerStyle:{backgroundColor:'#bc2326'},
        headerTintColor: '#FFF',
        }),
                                        
    },
    PlayLive: {
        screen: PlayLive,
        navigationOptions:()=>({                                                
            title:'Live TV',
             headerStyle:{backgroundColor:'#bc2326'},
        headerTintColor: '#FFF',
        }),
    },
    PlayLiveRadio: {                            
        screen: PlayLiveRadio,
        navigationOptions:()=>({                                                
            title:'Live Radio',
             headerStyle:{backgroundColor:'#bc2326'},
        headerTintColor: '#FFF',
        }),
    },
    
    ImageView: {
        screen: ImageView,
        navigationOptions:()=>({                                                
            title:'Image',
             headerStyle:{backgroundColor:'#bc2326'},
        headerTintColor: '#FFF',
        }),
    },
    GalleryView: {
        screen: GalleryView,
        navigationOptions:()=>({                                                
            title:'Pictures',
             headerStyle:{backgroundColor:'#bc2326'},
        headerTintColor: '#FFF',
        }),
    },
    PlayFullScreen: {
        screen: PlayFullScreen,
        navigationOptions:()=>({                                                
        header:null       
 }),
        
    },
   
},                      
    {
    
        headerMode: 'float',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;
    
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [layout.initWidth, 0, 0]
                });
    
                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                    outputRange: [0, 1, 1, 0.3, 0]
                });
    
                return { opacity, transform: [{ translateX }] }
            }
        })
        //getSlideFromRightTransition        
        // transitionConfig: () => ({
        //     transitionSpec: {
        //       duration: 500,                                                                           
        //       easing: Easing.inOut(Easing.poly(4)),                                                                                                                              
        //       timing: Animated.timing,
        //     },                                                       
        //     screenInterpolator: sceneProps => {
        //       const { layout, position, scene } = sceneProps;
        //       const { index } = scene;

        //       const height = layout.initHeight;
        //       const translateY = position.interpolate({
        //         inputRange: [index - 1, index, index + 1],
        //         outputRange: [height, 0, 0],
        //       });

        //       const opacity = position.interpolate({
        //         inputRange: [index - 1, index - 0.99, index],
        //         outputRange: [0, 1, 1],
        //       });

        //       return { opacity, transform: [{ translateY }] };
        //     },
        //   }),
    }

)

export default AppNavigator;