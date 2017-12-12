/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Linking,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';

var { height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class Contact extends Component {

 
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    if (Platform.OS == "android") {
      //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton = () => {
    const { navigate } = this.props.navigation;
    navigate('LoginPage', { index: 1 })
    return true;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
    const { navigate } = this.props.navigation;
    
    return (
      <ImageBackground style={{ width: width,
        height: height,               
        flex: 1,
        alignItems: 'center',}}
        source={{uri:'https://lh3.googleusercontent.com/-FRningNtRXM/WiUuHsf9f5I/AAAAAAAAAUo/SQm8dEE044EcLjg_XNBPNkc-qbLGeJPJgCK8BGAs/s512/2017-12-04.png'}}
       >  
          <ScrollView
          contentContainerStyle={{            alignItems: "center"
        }}
            style={{                
            borderRadius: 10,
            margin: 10,
            height: height - 100,
            backgroundColor: 'rgba(25, 79, 195,0.9)',                 
            width: width - 20,                                
          }}>                                                                         
          <Text style={styles.welcome}>Follow us on Social Media</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginBottom: -5 ,marginTop:20}}>
          <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");                         
                Linking.canOpenURL('fb://page/2038390573058056').then(supported => {
                  if (supported) {
                    Linking.openURL('fb://page/2038390573058056');
                  } else {                
                    Linking.canOpenURL('https://fb.com/2038390573058056').then(supported => {
                      if (supported) {
                        Linking.openURL('https://fb.com/2038390573058056');
                        
                      } else {
                         Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });
                  }
                });
              }}>
                <Image style={{ width: 50, height: 50 }} 
                source={{uri:'https://lh3.googleusercontent.com/-Pxmm-f1cmTk/Wi9Zh4y9l_I/AAAAAAAAAWA/xlxOcIxGhZ8JYjLpqnUMzS3DDgmNbv7wgCK8BGAs/s64/social-facebook-circular-button.png'}} />
              </TouchableOpacity>
              
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center',marginBottom:-15  }}>

              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL('https://vimeo.com/246591702').then(supported => {
                  if (supported) {
                    Linking.openURL('https://vimeo.com/246591702');   
                  } else {
                    Linking.canOpenURL('https://vimeo.com/246591702').then(supported => {
                      if (supported) {
                        Linking.openURL('https://vimeo.com/246591702');                   
                      } else {
                        Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });                  }                                
                });
              }}>       
                <Image style={{ width: 50, height: 50}} 
                source={{uri:'https://lh3.googleusercontent.com/-PvRPKleFtx8/Wi9ZejTR7jI/AAAAAAAAAV0/EGsddIKJyRc_RBfAACpKm3jjGSr0-QfIQCK8BGAs/s64/social-vimeo-circular-button.png'}} />
              </TouchableOpacity>
               <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL("mailto:?to=info@ab24.live").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:?to=info@ab24.live");
                  } else {
                    Toast.show('No app installed to open this link', Toast.LONG);
                  }
                });                                         
              }}>                                 
                <Image style={{ width: 50, height: 50,marginLeft:100 }}    
                source={{uri:'https://lh3.googleusercontent.com/-JwWiL1nfr6Q/Wi9aLvCNlRI/AAAAAAAAAWQ/fiGD41b1Yh8N9zOdZL4FSngSLuxf2EtcgCLcBGAs/s512/social-email-circular-button.png'}} />
              </TouchableOpacity>
            </View>


            <Image style={{ width: 60, height: 60,marginLeft:25,marginRight:25}} 
                source={{uri:'https://lh3.googleusercontent.com/-WYnCm7r2-ms/Wi9yjSZ0i4I/AAAAAAAAAXw/Goc8DQISbEMsIglzE24gtBSgHPWO5ZL7ACK8BGAs/s128/network.png'}} />
              

 <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center',marginTop:-15 }}>
         
              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");               
                Linking.canOpenURL('http://instagram.com/_u/dhadrian.wale/').then(supported => {
                  if (supported) {
                    Linking.openURL('http://instagram.com/_u/dhadrian.wale/');   
                  } else {
                    Linking.canOpenURL('http://instagram.com/_u/dhadrian.wale/').then(supported => {
                      if (supported) {
                        Linking.openURL('http://instagram.com/_u/dhadrian.wale/');                   
                      } else {
                        Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });                  }
                });
              }}>
                <Image style={{ width: 50, height: 50 }} 
                source={{uri:'https://lh3.googleusercontent.com/-7SDBt4noFCA/Wi9v5bW9JPI/AAAAAAAAAXI/4Ge9JM7uOWIMYs7Ju1YsuWKdmo4VyRHvACK8BGAs/s64/instagram.png'}} />
              </TouchableOpacity>
               <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL("http://twitter.com/parmeshar_tv/").then(supported => {
                  if (supported) {
                    Linking.openURL("http://twitter.com/parmeshar_tv/");
                  } else {
                    Linking.canOpenURL('http://twitter.com/parmeshar_tv/').then(supported => {
                      if (supported) {
                        Linking.openURL('http://twitter.com/parmeshar_tv/');                   
                      } else {
                        Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });                   }
                });
              }}>                                 
                <Image style={{ width: 50, height: 50,marginLeft:100 }}    
                source={{uri:'https://lh3.googleusercontent.com/-UpvA2BwFzQ8/Wi9v8rs1k_I/AAAAAAAAAXU/bjQe1hKmLMEMiXUToDLvVCZVgCUjIvXiACK8BGAs/s64/social-twitter-circular-button.png'}} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center',marginTop:-5 }}>
          
              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL('https://www.youtube.com/channel/UCUmpGF5CauoPXLioHOmvjpw').then(supported => {
                  if (supported) {
                    Linking.openURL('https://www.youtube.com/channel/UCUmpGF5CauoPXLioHOmvjpw');
                  } else {
                    Linking.canOpenURL('https://www.youtube.com/channel/UCUmpGF5CauoPXLioHOmvjpw').then(supported => {
                      if (supported) {
                        Linking.openURL('https://www.youtube.com/channel/UCUmpGF5CauoPXLioHOmvjpw');
                      } else {
                        Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });
                  }
                });
              }}>
                <Image style={{ width: 50, height: 50 }} 
                source={{uri:'https://lh3.googleusercontent.com/-zi8JlnVel8M/Wi9ZaVQnl2I/AAAAAAAAAVo/oIrBDR5csCA5tbEA3MxuM9nowTeBvfTJQCK8BGAs/s64/social-youtube-circular-button%2B%25281%2529.png'}} />
              </TouchableOpacity>
              </View>


          <View style={{ height: 2, backgroundColor: '#000', margin: 10 }} />
          <View style={{ flexDirection: 'column' }}>
          <View style={{flexDirection:'row',marginBottom:20,marginTop:20}}>
          <Icon name= {'person'} color={'#fff'} size={20}/>
          <Text style={{
    fontSize: 15,                       
    marginLeft:10,  
    color: "#fff"}}>Sanjeev Bhardwaj</Text>
          </View>
          <View style={{flexDirection:'row',marginBottom:20}}>
          <Icon name= {'place'} color={'#fff'} size={20}/>
          <Text style={{
            marginLeft:10,
    fontSize: 15,                       
    
    color: "#fff"}}>27750 Huntwood Ave Hayward 94544 CA USA</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Icon name= {'local-phone'} color={'#fff'} size={20}/>
          <Text style={{
            marginLeft:10,
    fontSize: 15,                       
    
    color: "#fff"}}>Tel: +1(510)320-8595/+1(510)359-8187</Text>
          </View>
          </View>                   

        </ScrollView>
      </ImageBackground>                   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    marginTop:20,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#fff'

  },
  text: {
               
    marginRight: 15,
    fontSize: 15,
    marginTop:5, 
    marginBottom: 10,
    marginLeft: 15,
    color: "#fff"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
