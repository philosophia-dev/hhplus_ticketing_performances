import { Users } from 'src/domain/auth/model/users.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UsersTypeORM implements Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  dateCreated: Date;

  @Column({ type: 'varchar', length: 128, nullable: false })
  emailAddress: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  phoneNumber: string;
}