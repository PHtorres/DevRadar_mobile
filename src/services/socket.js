import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.90:3333/', {
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