import { Stage } from 'src/domain/model/stage.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stage')
export class StageTypeORM implements Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  dateCreated: Date;

  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  location: string;
}
