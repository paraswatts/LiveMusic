import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  Platform,
  NetInfo,
  ImageBackground,
  ScrollView
} from 'react-native';
import { YouTube, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Toast from 'react-native-simple-toast';
var { height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-smart-splash-screen'
//import BlurImageView from 'react-native-blur-image-view';

export default class LiveTV extends Component {
 
   

  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      videoId: null,
      isLoading: true
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this._handleNetworkStateChange = this._handleNetworkStateChange.bind(this);                 
  }
                          
  getData() {
    
  }                       

  componentWillMount() {
    if(Platform.OS == 'android')
    {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    
  }

                        

  componentDidMount() {
    SplashScreen.close({ animationType: SplashScreen.animationType.fade, duration: 2000, delay: 500 })      
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

  handleBackButtonClick() {
    console.log("handle click")
    Alert.alert(
      'Exit App',
      'Want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'ok', onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    )
    return true
  }

 

  render() {
    try {
      const { navigate } = this.props.navigation;  
      if(this.state.networkType=='none')
      {
        return(
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('./no_internet.png')} style={{height:width,width:width*0.87}}/>
            </View>
        );
      }
      else{                 
      return (
        <ImageBackground style={{ 
          width: width,
           height: height,
           flex: 1,
           alignItems: 'center',}}
           source={{uri:'https://lh3.googleusercontent.com/-FRningNtRXM/WiUuHsf9f5I/AAAAAAAAAUo/SQm8dEE044EcLjg_XNBPNkc-qbLGeJPJgCK8BGAs/s512/2017-12-04.png'}}
          >  
           <ScrollView
          contentContainerStyle={{  
            alignItems: "center"
        }}
            style={{
            borderRadius: 10,
            margin: 10,
            height: height - 100,
            backgroundColor: 'rgba(25, 79, 195,0.9)',                 
            width: width - 20,                                                        
          }}>                 
            <View style={styles.container}>
              <Text style={{color:'#fff',fontSize:30,fontWeight:'bold'}}>Watch Live</Text>
            </View>
            <TouchableOpacity style={{marginTop:width*0.10 }} activeOpacity={0.5} onPress={() => {

                
                  if(this.state.networkType == 'none')
                  {
                    Toast.show('Oops no internet connection !', Toast.SHORT);                               
                  }
                  else{
                    navigate('PlayLive', { videoId: this.state.videoId })
                  }
                
                                                              
          }} >
          <Image 
          style={{width:width*0.6,height:width*0.6}}
          source={{uri:'https://lh3.googleusercontent.com/-KuOsu8eq6mM/WhwC8YDMjXI/AAAAAAAAASk/MD3wEJH2Um0IwshoqFuYyyhZGMgRzELiACK8BGAs/s512/2017-11-27.png'}}/>
          </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      );
    }
      }
    catch (error) {                                 
      Toast.show('error fetching data', Toast.LONG);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:width*0.1,
    justifyContent: 'center',
    height: width*0.15,                               
    borderRadius: 20,                                   
    alignItems: 'center'
  },
  artistName: {
    color: "#FFF",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "500",
    fontSize: 18,
    marginTop: 5
  },
  artistSongs: {
    color: "#CCC",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "300",
    fontSize: 14
  },
});
