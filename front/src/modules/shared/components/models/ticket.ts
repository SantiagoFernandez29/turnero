export type Ticket = {
  area: string;
  areaId: number;
  box: {
    id: number;
    name: string;
  } | null;
  citizenName: string | null;
  citizenSurname: string | null;
  code: string;
  document: number | null;
  id: number;
  prioritary: boolean;
  procedure: string;
  procedureId: number;
  takenAt: Date | null;
  createdAt: Date;
  userId: number;
};
