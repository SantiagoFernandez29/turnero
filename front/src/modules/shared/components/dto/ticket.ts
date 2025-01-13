export interface TicketDto {
    areaTitle: string;
    turn: string;
    emitedDate: string;
    waitingCount: number;
    voucher: string;
    box: {
        id: number;
        name: string;
    }
}