import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Animated,
  Easing,             
  Dimensions,
  ScrollView,
  NetInfo,
  AppState
} from 'react-native';
import YouTube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
var {height,width} = Dimensions.get('window');

import Video from 'react-native-video';


export default class PlayLiveRadio extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  constructor(props) {
    super(props);
    this.state = {
      playing:true,
      networkType:null
    }

  } 
  componentWillMount() {                        
    {
      AppState.addEventListener('change', this._handleAppStateChange);
      NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange);
                                                       
      }                                                               
    }

    componentWillUnmount()                                                  
    {
      NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange);      
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
         
      }                       
      this.setState({ appState: nextAppState }, () => {
        console.log("App State" + this.state.appState);
      });
    }

    _handleNetworkStateChange = (networkType) => {
      console.log(networkType);
      this.setState({networkType:networkType.type});
      if(networkType.type == 'none'){
        Toast.show('Oops no internet connection !', Toast.SHORT);                               
        console.log(networkType.type);
      }
      else{
        this.getData();
      }
    }
     

    togglePlay() {
      if(this.state.networkType == 'none')
      {
        Toast.show('Oops no internet connection !', Toast.LONG);      
      }
      else{
          this.setState({ playing: !this.state.playing });
      }
    } 

  
  render() {                    

    let playButton;
    if(this.state.networkType == 'none')
    {
      Toast.show('Oops no internet connection !', Toast.SHORT);                               
      
    }                               
    else{
    if (this.state.playing) {
      
      playButton = <Icon onPress={() => 
        {
        this.togglePlay()}}  name="pause" size={width*0.30} color="#fff" />;
      
    } else {
      playButton = <Icon onPress={() => 
        {
          this.togglePlay()}}  name="play-arrow" size={width*0.30} color="#fff" />;
    }
  }
    const { params } = this.props.navigation.state;
    return (
      <View style={{ width: width,
        height: height,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(25, 79, 195,0.5)',}}>  
        <View
         style={{alignItems:'center',
         justifyContent:'center',
         borderRadius: 10,
         margin: 10,
         height: height - 100,
         backgroundColor: 'rgba(25, 79, 195,0.7)',                 
         width: width - 20,                                         
       }}>  
       <View style={styles.play}>

       <Video source={{ uri: 'http://stream-tx1.radioparadise.com/mp3-128' }}
          ref="audio"                     
          style={this.state.video}
          volume={1.0}                      
          muted={false}                                       
          paused={!this.state.playing}
          resizeMode="cover"
          repeat={false} /> 
       {playButton}
       </View>
       </View>
      </View>
    );                                            
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  play: {
    alignItems:'center',
    justifyContent:'center',
      borderWidth:5,              
      height:width*0.50,
      width:width*0.50,
      borderColor: '#FFFFFF',
      borderRadius:(width*0.50)/2
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  containerAndroidFix: {
    marginBottom: 0.1
  }
});
