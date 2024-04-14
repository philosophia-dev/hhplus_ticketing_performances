import { Stage } from './stage.entity';

export class Performances {
  id: string;
  dateCreated: Date;
  title: string;
  stageId: string;
  stage?: Stage;
  ticketingStartDate: Date;
}
