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
