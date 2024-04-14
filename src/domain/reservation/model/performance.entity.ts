import { Stage } from './stage.entity';

export interface Performance {
  id: string;
  dateCreated: Date;
  title: string;
  stageId: string;
  stage?: Stage;
  ticketingStartDate: Date;
}
