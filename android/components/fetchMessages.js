import * as React from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, View, Text, FlatList, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import SocketIOClient from 'socket.io-client';

// Importing components
import image from './images';

export default class FetchMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
        }

        // Creating the socket-client instance will automatically connect to the server.
        this.socket = SocketIOClient('https://the-anonymous-chat-room.herokuapp.com');
    }

    async componentWillReceiveProps() {
        return fetch(`https://the-anonymous-chat-room.herokuapp.com/chat-messages/room-id=${await AsyncStorage.getItem('chatRoomId')}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    messages: data,
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    sendMessage() {
        console.log('Send message');
        
        this.socket.on('message', () => {
            var oldMessages = this.state.messages;

            // React will automatically rerender the component when a new message is added.
            this.setState({ messages: oldMessages.concat(this.state.newMessage) });
        });

        console.log('Message send');
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{ flex: 1 }}>
                    <ImageBackground source={image.roomBG} style={{ width: '100%', height: '100%' }}>
                        <View style={{ padding: 10 }}>
                            <FlatList
                                data={this.state.messages}
                                renderItem={({ item }) =>
                                    <View style={styles.messageView}>
                                        <Text style={styles.messageText}>{item.chat_message_text}</Text>
                                    </View>
                                }
                                keyExtractor={item => JSON.stringify(item.chat_message_id)}
                            />
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.15 }}>
                    <TextInput
                        label='Message'
                        value={this.state.text}
                        onChangeText={text => this.setState({ newMessage: text })}
                    />
                    <Button icon="add-a-photo" mode="contained" onPress={() => this.sendMessage}>
                        Press me
                    </Button>
                </View>
                <View style={{ flex: 0.4 }}>
                    <Text style={styles.txt}>Characters</Text>
                </View>
            </View>
        );
    }
}

// Styling
var styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
    },
    bottomSection: {
        flex: 0.4,
    },
    messageView: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(33,33,33,0.5)',
    },
    messageText: {
        color: '#fff',
    },
    txt: {
        color: '#000',
    },
});

AppRegistry.registerComponent('FetchMessages', () => FetchMessages);