import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  NetInfo,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import AlbumView from './AlbumView';
import GalleryView from './galleryView';
import LiveRadio from './liveRadio';
import LiveTV from './liveTV';
import Contact from './contact';

var { height, width } = Dimensions.get('window');


const HomePage = TabNavigator({
                                            
  LiveTV: {
        screen: LiveTV,
        navigationOptions: () => ({
          title: 'Live TV',
          headerStyle: { backgroundColor: '#194fc3' },
          headerTintColor: '#FFF',
      })
    },                                                            
    LiveRadio: {
      screen: LiveRadio,
      navigationOptions: () => ({
        title: 'Live Radio',
        headerStyle: { backgroundColor: '#194fc3' },
        headerTintColor: '#FFF',
    })
  }, 
  GalleryView: {                       
    screen: GalleryView,
    navigationOptions: () => ({
      title: 'Gallery',
      headerStyle: { backgroundColor: '#194fc3' },
      headerTintColor: '#FFF',
  })
},    
    Contact: {
      screen: Contact,
      navigationOptions: () => ({
        title: 'Contact Us',
        headerStyle: { backgroundColor: '#194fc3' },
        headerTintColor: '#FFF',
    })
  }                                                                             

   
  }, 
  {
    animationEnabled: true,  
    backBehavior:'none', 
    tabBarPosition:'bottom',                      
    tabBarOptions: {      
      pressOpacity:0.5,
      upperCaseLabel: false,  
      activeBackgroundColor:'#ffffff',
        activeTintColor: '#ffffff',
        inactiveTintColor: '#c8cace',
        showIcon: false,
        scrollEnabled:true,
        indicatorStyle: {                         
          borderBottomWidth: 5,
          borderColor: '#bc2326'
        },
        pressColor:'rgba(33,37,101,0.7)',                       
        labelStyle:{   
          fontWeight: 'bold',                         
          fontSize: 15,                   
          justifyContent: 'center',
          alignItems: 'center',
        },
        style:{
          
          backgroundColor: '#194fc3',
        },
        tabStyle: {
                                                  
          width:width*0.30,  
        }
    },
  });

  export default HomePage;
  