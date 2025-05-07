import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  date_birth: string;

  @Column({ default: 'USER' })
  role: 'USER' | 'ADMIN';

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @CreateDateColumn()
  created_at: Date;
}
