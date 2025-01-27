export type Ticket = {
  // area: string;
  areaId: number;
  box: {
    id: number;
    name: string;
  } | null;
  code: string;
  // procedure: string;
  prioritary: boolean;
  procedureId: number;
  takenAt: string;
  id: number;
  userId: number | null;
  // userIdentifier: string;
};
