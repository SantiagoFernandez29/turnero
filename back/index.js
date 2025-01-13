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

    socket.on(EVENTS.TOTEM.SELECT_AREA, (ticket) => {
        console.log(ticket);

        // io.emit(EVENTS.MONITOR.TICKET_GENERATED, {
        //     turn: ticket.ticket.turn,
        //     box: "BOX-X"
        // })

        // io.emit(EVENTS.TOTEM.TURN_GENERATED, {
        //     turn: ticket.ticket.turn
        // })

        io.emit(EVENTS.BACKOFFICE.TICKET_GENERATED, ticket)
    })

    socket.on(EVENTS.BACKOFFICE.CALL_TICKET, (ticket) => {
        console.log(ticket);
        io.emit(EVENTS.MONITOR.TICKET_GENERATED, ticket)
    })

    socket.on(EVENTS.BACKOFFICE.CONNECTED_BOX, (data) => {
        console.log(data);
    })
    
});

io.on('disconnect', (socket) => {
    console.log('Se desconectó un cliente');
});

httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
});

