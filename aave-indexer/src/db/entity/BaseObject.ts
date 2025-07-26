import {
  Column,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

export class BaseObject extends BaseEntity {
  @Column({ type: "bigint" })
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ type: "text", nullable: true, default: "SYSTEM" })
  created_by!: string;

  @Column({ type: "text", nullable: true, default: "SYSTEM" })
  updated_by!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
