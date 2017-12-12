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
    WebView,
    NetInfo,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    ActivityIndicator,
    FlatList,
    ImageBackground,
    RefreshControl,            
    ScrollView
    
} from 'react-native';
var Spinner = require('react-native-spinkit');
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import ImageZoom from 'react-native-image-pan-zoom';
var { height, width } = Dimensions.get('window');
import ProgressPie from 'react-native-progress/Pie';
import { createImageProgress } from 'react-native-image-progress';
const Image1 = createImageProgress(FastImage);
import FastImage from 'react-native-fast-image'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
    'u'
});
var Spinner = require('react-native-spinkit');

export default class GalleryView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            isLoading: true,
            loading:true,
            refreshing:false,
            networkType:null,
            image:null,
            imageIndex:null
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this._handleNetworkStateChange = this._handleNetworkStateChange.bind(this);
    }
   

    componentWillMount() {
                
        console.log("Gallery View");
        this.getData();
        NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange);
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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

      getData() {
        return fetch('http://ab24.live/api/get_post/?id=511')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("response+++++++" + responseJson.post.attachments[0].images.full.url)
            this.setState({
             posts:responseJson.post.attachments,
              isLoading: false,
              refreshing:false ,
              image:responseJson.post.attachments[0].images.full.url

            });
          }).catch((error) => {
            console.error(error);
          });
      }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange);
        
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getData();
      }

    _keyExtractor = (itemData, index) => index;


    _renderItem = (itemData) => {
       
            console.log("Render Item");
            const { navigate } = this.props.navigation;
            var items = this.state.posts;
            
            

                return (
                        <TouchableOpacity                               
                            style={{borderRadius:5}}
                            onPress={() => {
                                if(this.state.networkType == 'none')
                                {
                                    Toast.show('Oops no internet connection !', Toast.LONG);

                                }
                                else{
                                    
                                    var index = items.indexOf(itemData.item);
                                    console.log("flatlist image index"+index);                                          
                                    this.setState({image:itemData.item.images.full.url});
                                //navigate('ImageView', { image: itemData.item.images.full.url })
                                }
                            }}                                  
                        >                                                                              
                            <Image1                                                                
                              indicator={ProgressPie}
                    indicatorProps={{
                        color: 'rgba(33,37,101,1)}'

                    }}                                                                                         
                                source={{ uri: itemData.item.images.UGML_gallery_admin_thumb.url }}
                                style={{ width: (width * 22) / 100, height: (width * 22) / 100, borderRadius:5,alignItems:'center',justifyContent:'center'}} >                                      
                            

                                </Image1> 
                                                                                        
                        </TouchableOpacity>
                );
            

      
    }

    _renderItem2 = (itemData) => {
        
             console.log("Render Item");
             const { navigate } = this.props.navigation;
 
                 return (
                    <ImageZoom                                              
                    cropWidth={width}                           
                    cropHeight={height}         
                    imageWidth={width}
                    imageHeight={width*0.80}>                                                    
                    <Image1                                                         
                        indicator={ProgressPie}
                        indicatorProps={{
                            color: 'rgba(33,37,101,1)}'   
                        }}                                                                                   
                        style={{ 
                            height: width*0.80, width: width }}                                                                               
                        source={{ uri: itemData.item.images.full.url }} />
                </ImageZoom>
                         
                 );

     }

    render() {
        const { params } = this.props.navigation.state;
        if(this.state.networkType=='none')
        {
          return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Image source={require('./no_internet.png')} style={{height:width,width:width*0.87}}/>
              </View>
          );
        }
        else{  
        if (this.state.isLoading) {
            return (
                <View style={{ width: width,
                    height: height,
                    flex: 1,
                    backgroundColor:'#FFF',
                    alignItems: 'center',}}  
                   >  
                    <Spinner
                        type='Wave' color='rgba(25, 79, 195,1)}' />
                </View>
            )
        } else {                                    
            console.log("else");
        return (
            <View style={{flex:1,height:height,flexDirection:'column',backgroundColor:'rgba(0,0,0,0.5)'}}>                                                                              
                <View style={{flex:0.85,alignItems:'center',justifyContent:'center'}}>                              
                <ImageZoom                                              
                cropWidth={width}                           
                cropHeight={height}         
                imageWidth={width}
                imageHeight={width*0.80}>                                                    
                <Image1                                                         
                    indicator={ProgressPie}
                    indicatorProps={{
                        color: 'rgba(33,37,101,1)}'

                    }}                                                                                   
                    style={{ 
                        alignSelf:'center',                     
                        
                        height: width*0.80, width: width }}                                                                               
                    source={{ uri: this.state.image }} />
            </ImageZoom>

                {/* <FlatList                                                               
                    horizontal  
                    pagingEnabled                                                                                                                                                                             
                    style={{bottom:100}}                                                     
                    showsHorizontalScrollIndicator={false}
                    data={this.state.posts}
                    renderItem={this._renderItem2}
                    keyExtractor={this._keyExtractor} /> */}
            </View>
                        <View style={{flex:0.15}}>
                <FlatList   
                    horizontal                                                                                                              
                    refreshControl={                                                                                                                                                   
                    <RefreshControl
                      colors={["#bc2326", "#FFF", "#191565"]}
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                    />}                                                                     
                    style={{                        
                        
                    }}                                                      
                    showsHorizontalScrollIndicator={false}
                    data={this.state.posts}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor} />
                    </View>
            </View>                                
        );                                                                              
    }
    }
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(25, 79, 195,0.5)',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
