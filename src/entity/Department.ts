import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Leacture } from "./Leacture";
import { Project } from "./Project";
import { Student } from "./Student";

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    length: 200,
  })
  name: string;

  @OneToMany((type) => Student, (studnets) => studnets.department)
  students: Student[];

  @Column({ default: true })
  active: boolean;

  @OneToMany((type) => Leacture, (leacture) => leacture.department)
  leactures: Leacture[];

  @OneToMany((type) => Project, (project) => project.department)
  projects: Project[];
}
