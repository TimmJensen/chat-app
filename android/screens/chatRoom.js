import * as React from 'react';
import { AppRegistry, View } from 'react-native';

// Importing components
import FetchingMessages from '../components/fetchMessages';

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <FetchingMessages />
            </View>
        );
    }
}

AppRegistry.registerComponent('ChatRoom', () => ChatRoom);