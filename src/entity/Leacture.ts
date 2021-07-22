import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Certification } from "./Certification";
import { Department } from "./Department";
import { Project } from "./Project";

@Entity()
@Unique(["email"])
export class Leacture extends BaseEntity {
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

  @Column()
  sciTitle: string;

  @ManyToOne((type) => Department, (department) => department.leactures)
  department: Department; //  relationship

  @Column({ default: true })
  active: boolean;

  @OneToMany((type) => Certification, (certificated) => certificated.leacture)
  certificates: Certification[];

  @OneToMany((type) => Project, (project) => project.leacture)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;
}
