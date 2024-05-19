import { Stage } from './stage.model';

export interface Performance {
  id: string;
  dateCreated: Date;
  title: string;
  stageId: string;
  stage?: Stage;
  ticketingStartDate: Date;
}
