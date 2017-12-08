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
  NetInfo,
  Image,
  Dimensions,
  StatusBar,
  PixelRatio,
  ActivityIndicator
} from 'react-native';
import YouTube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import Slider from 'react-native-slider';
var { height, width } = Dimensions.get('window');
const statusBarSize = 25;

export default class PlayLive extends Component {

  componentDidMount() {
    //Orientation.lockToPortrait();
  }

  constructor(props) {
    super(props);
    this.state = {                                                
      playing: true,
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      songIndex: 0,
      songsArray:[],
      networkType:null,
      video:styles.video,
      view:styles.view,
      fullScreen:false,
      controls:styles.controls,
      isLoading:true
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }     

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => {
      navigation.goBack();
    }}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange)    
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  _handleNetworkStateChange = (networkType) => {
    console.log(networkType);
    this.setState({networkType:networkType.type});
    if(networkType.type == 'none'){
      this.setState({ playing: false});
      Toast.show('Oops no internet connection !', Toast.SHORT);                               
      console.log(networkType.type);
    }
    else{
      this.setState({ playing: true});
      
    }
    
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentWillMount() {
  {
      const { params }   = this.props.navigation.state;
     
      NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange)      
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      //this._SongIndex()
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

  toggleVolume() {
    this.setState({ muted: !this.state.muted });
  }


  randomSongIndex() {
    const { params } = this.props.navigation.state;
    let maxIndex = params.songs.length - 1;
    return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
  }

  setTime(params) {
    if (!this.state.sliding) {
      this.setState({ currentTime: params.currentTime });
    }
  }

  onLoad(params) {
    console.log("duration"+params.currentTime)
    this.setState({ isLoading: false });
  }

  onLoadStart() {
    this.setState({ isLoading: true });
  }

  onSlidingStart() {
    this.setState({ sliding: true });
  }

  onSlidingChange(value) {
    let newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }

  onSlidingComplete() {
    this.refs.audio.seek(this.state.currentTime);
    this.setState({ sliding: false });
  }

  toggleFullScreen() {
    // const {navigate} = this.props.navigation;
    // navigate('PlayFullScreen')
    this.setState({fullScreen:!this.state.fullScreen},()=>{

      if(this.state.fullScreen)
      {
      this.setState({video:styles.videoStyle,view:styles.topViewStyle,controls:styles.controlsFullscreen});
      }
      else{
        this.setState({video:styles.video,view:styles.view,controls:styles.controls});
        
      }
    })
    
  }

  onEnd() {
    this.setState({ playing: false });
  }

  onBuffer() {
    
  }

  render() {
    
    const { params } = this.props.navigation.state;
    
    
    let songPercentage;
    if (this.state.songDuration !== undefined) {
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }

    let playButton;
   
    if (this.state.playing) {
      
      playButton = <Icon onPress={() => this.togglePlay()} style={styles.play} name="pause" size={70} color="#fff" />;
    } else {
      playButton = <Icon onPress={() => this.togglePlay()} style={styles.play} name="play-arrow" size={70} color="#fff" />;
    }

  

    let volumeButton;                 
    if (this.state.muted) {
      volumeButton = <Icon onPress={this.toggleVolume.bind(this)} style={styles.volume} name="volume-off" size={18} color="#fff" />;
    } else {
      volumeButton = <Icon onPress={this.toggleVolume.bind(this)} style={styles.volume} name="volume-up" size={18} color="#fff" />;
    }

    fullscreenButton = <Icon onPress={() => this.toggleFullScreen()} style={{marginTop:20}} name="fullscreen" size={30} color="#fff" />;
    

                 
                  
    return (
      <View style={styles.container}>
      <View style={this.state.view}>
        <Video source={{ uri: 'http://capcobroadcaststream.in:1935/capco/ad24/playlist.m3u8' }}
          ref="audio"                     
          style={this.state.video}
          volume={this.state.muted ? 0 : 1.0}           
          muted={false}                                       
          paused={!this.state.playing}
          onLoadStart={this.onLoadStart.bind(this)}
          onLoad={this.onLoad.bind(this)}     
          onProgress={this.setTime.bind(this)}
          onEnd={this.onEnd.bind(this)}
          onBuffer={this.onBuffer.bind(this)}
          resizeMode="cover"
          repeat={false} />  
                    <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" style={{position:'absolute'}} />
 
          </View>  
                                                      
        <View style={this.state.controls}>
          {volumeButton}
          {playButton}
          {fullscreenButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view:{
    flex:0.85,alignItems:'center',justifyContent:'center'
  },
  video:{
    height:width*0.70,width:width,backgroundColor:'#000'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  topViewStyle: {

    transform: [
      { rotateZ: '90deg'},
    ],                                  
    height: width,
    width: height,
  },
  videoStyle: {
    marginLeft:50,
    height: width + statusBarSize,
    width:height,
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: window.width,
  },
  headerClose: {
    position: 'absolute',
    top: 10,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: 'center',
  },
  songImage: {
    marginBottom: 20,
  },
  songTitle: {
    marginRight: 20,
    marginLeft: 20,
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    marginBottom: 20,
  },  
  controls: {
    bottom:100,
    position:'absolute',
    flex:0.15,                                                    
    flexDirection: 'row',

  },              
  controlsFullscreen: {
    bottom:-10,
    position:'absolute',
    flexDirection: 'row',

  },
  back: {
    marginTop: 22,
    marginLeft: 45,
  },
  play: {
    marginLeft: 50,
    marginRight: 50,
  },
  forward: {
    marginTop: 22,
    marginRight: 45,
  },
  shuffle: {
    marginTop: 26,
  },
  volume: {
    marginTop: 26,
  },
  sliderContainer: {
    width: window.width - 40,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#FFF',
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: '#FFF',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
  slider: {
    marginTop:20,
    height: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#191565',
    borderRadius: 10 / 2,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});

function withLeadingZero(amount) {
  if (amount < 10) {
    return `0${amount}`;
  } else {
    return `${amount}`;
  }
}

function formattedTime(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if (isNaN(minutes) || isNaN(seconds)) {
    return "";
  } else {
    return (`${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`);
  }
}

//   static navigationOptions = ({ navigation }) => ({
//     headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
//   });

//   componentDidMount() {
//   }
//   render() {
//     const { params } = this.props.navigation.state;
//     return (
//       <View style={styles.container}>
//         {/* <YouTube                      
//           controls={1}
//           apiKey='AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E'
//           videoId={params.videoId} // The YouTube video ID                        
//           play={false} // control playback of video with true/false                           
//           fullscreen={true} // control whether the video should play in fullscreen or inline
//           loop={true} // control whether the video should loop when ended
//           onReady={e => this.setState({ isReady: true })}
//           onChangeState={e => this.setState({ status: e.state })}
//           onChangeQuality={e => this.setState({ quality: e.quality })}
//           onError={e => this.setState({ error: e.error })}
//           style={{ alignSelf: 'stretch', height: 250, left: 0, top: 0, bottom: 0, right: 1 }}
//           modestbranding={true}
//         /> */}
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },

//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },

//   containerAndroidFix: {
//     marginBottom: 0.1
//   }
// });
