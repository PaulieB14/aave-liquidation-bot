import { BaseObject } from "./BaseObject";
import { Column, Entity } from "typeorm";

@Entity()
export class Accounts extends BaseObject {
  @Column({ nullable: false, type: "varchar", unique: true })
  wallet_address: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  health_factor: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  total_collateral_eth: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  total_debt_eth: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  ltv: string;
}
