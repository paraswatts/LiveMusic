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
    FlatList
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';

var { height, width } = Dimensions.get('window');
import ProgressPie from 'react-native-progress/Pie';
import { createImageProgress } from 'react-native-image-progress';
const Image1 = createImageProgress(FastImage);
import FastImage from 'react-native-fast-image'
import ImageZoom from 'react-native-image-pan-zoom';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
    'u'
});

export default class ImageView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}><Icon
                name='navigate-before'
                style={{
                    marginLeft: 10
                }}
                size={40}
                color={'white'} /></TouchableOpacity>
        )
    });

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    _keyExtractor = (itemData, index) => index;

    render() {
        try {
            const { params } = this.props.navigation.state;
            var widthFb = params.width
            var heightFb = params.height
            var difference = heightFb / widthFb
            console.log("image url"+params.image)
            return (                                                        
                <View style={styles.container} >
                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={width}
                        imageHeight={width*0.70}>
                        <Image1
                            indicator={ProgressPie}
                            indicatorProps={{
                                color: 'rgba(33,37,101,1)}'

                            }}
                            style={{ height: width*0.70, width: width }}
                            source={{ uri: params.image }} />
                    </ImageZoom>
                </View>
            );
        }
        catch (error) {
            Toast.show('error fetching data', Toast.LONG);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(25, 79, 195,0.5)',
        justifyContent: 'center'
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
