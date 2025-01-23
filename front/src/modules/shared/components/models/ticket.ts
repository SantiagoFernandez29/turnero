// export type Ticket = {
//   areaTitle: string;
//   turn: string;
//   emitedDate: string;
//   waitingCount: number;
//   voucher: string;
//   box: {
//     id: number;
//     name: string;
//   };
// };

export type Ticket = {
  area: string;
  areaId: number;
  box: {
    id: number;
    name: string;
  };
  code: string;
  procedure: string;
  prioritary: boolean;
  procedureId: number;
  takenAt: string;
  uid: number;
  userIdentifier: string;
};
