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
        io.emit(EVENTS.BACKOFFICE.TICKET_GENERATED, ticket)
    })

    socket.on(EVENTS.BACKOFFICE.CALL_TICKET, (ticket) => {
        console.log(ticket);
        io.emit(EVENTS.MONITOR.TICKET_GENERATED, ticket)
    })

    socket.on(EVENTS.BACKOFFICE.CONNECTED_BOX, (data) => {
        console.log(data);
    })
    
    socket.on(EVENTS.BACKOFFICE.PENDING_TICKETS, (tickets) => {
        console.log(tickets);
        io.emit(EVENTS.BACKOFFICE.NEW_PENDING_TICKETS, tickets)
    })

    socket.on(EVENTS.BACKOFFICE.FINISH_TICKET, (ticket) => {
        console.log(ticket);
        io.emit(EVENTS.MONITOR.FINISH_TICKET, ticket)
    })

    socket.on(EVENTS.BACKOFFICE.TICKET_SERVED, (ticket) => {
        console.log(ticket);
        io.emit(EVENTS.MONITOR.TICKET_SERVED, ticket)
    })

    socket.on(EVENTS.BACKOFFICE.RECALLING_TICKET_ALARM, () => {
        io.emit(EVENTS.MONITOR.RECALLING_TICKET_ALARM)
    })
    
});

io.on('disconnect', (socket) => {
    console.log('Se desconectó un cliente');
});

httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
});

