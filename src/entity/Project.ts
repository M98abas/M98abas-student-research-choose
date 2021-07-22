import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Department } from "./Department";
import { Leacture } from "./Leacture";
import { Student } from "./Student";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    length: 200,
  })
  title: string;

  @ManyToOne((type) => Leacture, (leacture) => leacture.projects)
  leacture: Leacture; // TODO:  relationship

  @ManyToOne((type) => Department, (department) => department.projects)
  department: Department;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  active: boolean;

  @Column({ default: true })
  isOpen: boolean;

  @OneToMany((type) => Student, (students) => students.project)
  students: Student[];
}
