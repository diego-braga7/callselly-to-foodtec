import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from "typeorm";
  
  export enum OrderStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    ERROR = "error",
  }
  
  @Entity("order")
  export class Order {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column("text")
    data!: string;
  
    @Column({
      type: "enum",
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    })
    status!: OrderStatus;
  
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
  
    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt?: Date | null;
  }
  