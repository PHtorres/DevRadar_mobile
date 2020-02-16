import socketio from 'socket.io-client';
import {SOCKET_URL} from '../../.env.json';

const socket = socketio(SOCKET_URL, {
    autoConnect: false
});

function connect(parametros){
    socket.io.opts.query = parametros;
    socket.connect();
}

function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export{
    connect,
    disconnect
}