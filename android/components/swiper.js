import * as React from 'react';
import { AppRegistry } from 'react-native';
import Swiper from 'react-native-swiper'

// Importing screens
import ChatList from '../screens/chatList';
import ChatRoom from '../screens/chatRoom';

export default class SwipeScreens extends React.Component {
    render() {
        return (
            <Swiper showsButtons={false} showsPagination={false} loop={false}>

                <ChatList />

                <ChatRoom />
            </Swiper>
        );
    }
}

AppRegistry.registerComponent('SwipeScreens', () => SwipeScreens);