import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index } from 'typeorm';

export abstract class ExtendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  is_delete: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
