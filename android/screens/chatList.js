import * as React from 'react';
import { AppRegistry, View } from 'react-native';

// Importing components
import FetchingRooms from '../components/fetchRooms';

export default class ChatLists extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <FetchingRooms />
            </View>
        );
    }
}

AppRegistry.registerComponent('ChatLists', () => ChatLists);