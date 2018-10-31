import * as React from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, View, StatusBar, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import SocketIOClient from 'socket.io-client';

export default class FetchRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            rooms: []
        }

        // Creating the socket-client instance will automatically connect to the server.
        this.socket = SocketIOClient('https://the-anonymous-chat-room.herokuapp.com');
    }

    componentWillMount() {
        return fetch('https://the-anonymous-chat-room.herokuapp.com/chat_rooms')
        .then(res => res.json())
        .then(data => {            
            this.setState({
                rooms: data
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    async joiningRoom(id) {
        this.setState({
            isClicked: true
        });
        await AsyncStorage.setItem('chatRoomId', JSON.stringify(id));
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar hidden={true}  /* Hiding the status bar */ />

                <FlatList
                    data={this.state.rooms}
                    renderItem={({item}) =>
                        <View style={styles.visual}>
                            <Text>{item.chat_room_name}</Text>
                            <Text>Seats: 0/{item.chat_room_seats}</Text>
                            <Button style={this.state.isClicked ? styles.btnClicked : styles.button} icon="event-seat" mode="contained" onPress={() => this.joiningRoom(item.chat_room_id)}>
                                {this.state.isClicked ? 'Free this seat' : 'Take a seat'}
                            </Button>
                        </View>
                    }
                    keyExtractor={item => JSON.stringify(item.chat_room_id)}
                />
            </View>
        );
    }
}

// Styling
var styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        padding: 10,
    },
    visual: {
        marginTop: 5,
        marginBottom: 5,
    },
    btnClicked: {
        backgroundColor: '#190'
    }
});

AppRegistry.registerComponent('FetchRooms', () => FetchRooms);