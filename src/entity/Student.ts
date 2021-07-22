import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Department } from "./Department";
import { Project } from "./Project";

@Entity()
@Unique(["email"])
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    length: 200,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne((type) => Project, (project) => project.students)
  project: Project; // TODO:  relationship

  @ManyToOne((type) => Department, (department) => department.students)
  department: Department; //  relationShip => department

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
