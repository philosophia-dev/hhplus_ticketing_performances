import { Stage } from './stage.entity';

export interface Performances {
  id: string;
  dateCreated: Date;
  title: string;
  stageId: string;
  stage?: Stage;
  ticketingStartDate: Date;
}
