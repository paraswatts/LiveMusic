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
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");                         
                Linking.canOpenURL('fb://page/27682782579').then(supported => {
                  if (supported) {
                    Linking.openURL('fb://page/27682782579');
                  } else {                
                    Linking.canOpenURL('https://fb.com/27682782579').then(supported => {
                      if (supported) {
                        Linking.openURL('https://fb.com/27682782579');
                        
                      } else {
                         Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });
                  }
                });
              }}>
                <Image style={{ width: 40, height: 40 }} 
                source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCgkJGCCQ0LayAAAHY0lEQVR42u3dTWgUdxzG8ec3DRShSAtpwWgPIRhp1CpIpDlIe1BIQ9QcipIeerWtFDy06iHQi4W+HHppwVvBHopgNYkvsZhDWygpSkAFQ43EhdbdgI20TSn2Jcm/hxjztrPZzc7sb5Pn+XhJNtnZ3zjf7Ex2ZzeGooQmtKIedViPOqxDTXHXkgqbwChyyCKHDC7bUDFXscJfDhFa0IH92Oi9blKyO+hBNwZsqtA3FQggGA7iBBq810PKMoIunLYQ9+XYAMJufIgd3tNLIgZx3PrzfylvAKEWp/Cq99SSqD68YWOLL84TQGjCBdR7zyuJy6B98YFhtPCC0IYBbf5VqR4DoW3hhQsCCIfQi7Xek0pK1qI3HJp/0bxdQGhDL57wnlJSNYl9dmn20zkBhCYM6KefwDhaZo8FHgcQanFV+34SGeyc+Y1g9hjglDY/jXqcmvnw0T1A2I0r3lNJRe2ZfmjIACAYrulRPzKDaLYwsws4qM1PZwcOAoABIcKwnvIhNIJGm4oAtGjzU2pAy/QuoMN7EnHSMb0LGNbpHqTuWKOFJtzynkPcbI7Q6j2DOGqN9PgftfoIdd4ziKO6COu9ZxBH63UPwK3Own96mUfFjCGLLEYxUdZSmrArsYkmarT5UzWK87iNLLLIImf/JLHI8GaCAdRo86flLs7iHAbiX5JRHRRA8m7iHM7aTe8xiqMAkhRwGu/bsPcYpVAAyfke79o17yFKFZW/CAHwE/bbyytv8yuAJNzHW9hqvd5jLI92AeU6iaP2p/cQy6cAyjGBd+yk9xDlUQDL9wCv2bfeQ5RLASzXEPbaXe8hyqeDwOW5iJdWw+ZXAMvzCfat5AO/ubQLKN1ndtR7hOToHqBUV3DEe4QkKYDSDOOATXoPkSQFUIrfsNd+9x4iWQqgeBM4sLKe6SuGAijekbg3W1zJFECxvrDPvUdIgwIozjiOeY+QDgVQnI/sV+8R0qEAinEPn3qPkBYFUIwue+g9QloUwNJu4EvvEdKjAJb2XuG/ubGyKYClfGOr+h0UFcBSPvYeIF0KoLAH+M57hHQpgMLOr67n/hZTAIWd9R4gbQqgkL9W/1toK4BC+uxv7xHSpgAKOec9QPoUQLx/cdF7hPQpgHg/2B/eI6RPAcTLeA9QCQogXs57gErQC0PipRZAWIPt2PLo33O+K6kA4qUSQFiDt3EMz3qv3AwFEC+FAMIL6Kmuv86gY4B4iQcQXsGP1bX5AQtV/kaGbqbwpJX3lq4LhAZcwzPeq7WQ7gHi3E9480f4uvo2vwKIl/Rp4AewzXuV8lEAcZI+D/C49wrlpwAqIjyFF71nyE8BVMaWmT/TXW0UQGVU6c+/AqiUrd4DxFEAlaEAyD3tPUAcBUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5lvcI+gD3SrzGWKK3fwK1iS1rF15PbjCWAM7Ydc+btzPJLSsgyQC0CyCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoAcy5tEbQqlXuOh3U7u5sMmrElsYRuSmwuwUPL/DIkbtj25hYXr2Oa9QvlpF0BOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUALkaTKDGe4iqtCGcTHJp3qsTY8LCz3jeewpx80uEnPcM4igXIes9gzjK6h6AWy5CxnsGcZSx0IRb3lOIm80GhGFs9J5DXNyxxghAj/cc4qRn+pHAbu85xEk3YECIMIwG71mk4kbQaFMRYFPo8p5FHHTZFGAAEAzXsMN7HqmoQTRbePRsoAUc955HKuy4BeDx08HWjz7viaSC+qx/+gObuSTU4irqveeSishgp41Nf/j4hBAbQzvGvSeTChhH+8zmn3dGkA2hE5Pe00nKJtFpQ7OfzjslzC7hsBJY1SZx2C7NvcAWfkdow1dY6z2npGIcnfM3f54AgNCECzocXIUyaJ975z8tz1nBNoSd+qVw1enDzsWbP+a0cBuzNuzBoPfMkpBB7LG22SP/uWJfF2D9aEYnRrxnlzKNoBPNMw/7LGaFrx0itKAD+3XKyAp0Bz3oxoBNFfomK25ZoQmtqEcd1qMO6/RSkio1gVHkkEUOGVzOt8df7H9AYiGGR/+DsAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMC0wOVQwOToyNDozMiswMjowMMK3mQUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTAtMDlUMDk6MjQ6MzIrMDI6MDCz6iG5AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=='}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL('http://instagram.com/_u/aajtak').then(supported => {
                  if (supported) {
                    Linking.openURL('http://instagram.com/_u/aajtak');
                  } else {
                    Linking.canOpenURL('http://instagram.com/aajtak').then(supported => {
                      if (supported) {
                        Linking.openURL('http://instagram.com/aajtak');
                      } else {
                        Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });
                  }
                });
              }}>
                <Image style={{ width: 40, height: 40,  marginLeft: 30,  }} 
                source={{uri:'data:image/png;base64,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'}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL('http://twitter.com/aajtak').then(supported => {
                  if (supported) {
                    Linking.openURL('http://twitter.com/aajtak');   
                  } else {
                    Linking.canOpenURL('http://twitter.com/aajtak').then(supported => {
                      if (supported) {
                        Linking.openURL('http://twitter.com/aajtak');   
                      } else {
                        Toast.show('No app installed to open this link', Toast.LONG);
                      }
                    });                  }
                });
              }}>
                <Image style={{ width: 40, height: 40, marginLeft: 30 }} 
                source={{uri:'data:image/png;base64,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'}} />
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
                <Image style={{ width: 40, height: 40,marginLeft:30 }}    
                source={{uri:'data:image/png;base64,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'}} />
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
