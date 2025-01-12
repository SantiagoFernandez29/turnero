import { createServer } from 'http';
import { Server } from 'socket.io';
import { EVENTS } from './events.js';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
})

io.on('connection', (socket) => {
    console.log('Se conectó un cliente');

    socket.on(EVENTS.TOTEM.SELECT_AREA, (data) => {
        console.log(data);

        io.emit(EVENTS.MONITOR.TICKET_GENERATED, {
            turn: data.ticket.turn,
            box: "BOX-X"
        })
    })

    socket.on(EVENTS.BACKOFFICE.CALL_TICKET, (data) => {
        console.log(data);

        io.emit(EVENTS.MONITOR.TICKET_GENERATED, {
            turn: data.ticket.turn,
            box: data.ticket.box
        })
    })
    
});

io.on('disconnect', (socket) => {
    console.log('Se desconectó un cliente');
});

httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
});

