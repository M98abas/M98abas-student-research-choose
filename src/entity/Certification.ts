import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Leacture } from "./Leacture";

@Entity()
export class Certification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 200 })
    title: string;

    @ManyToOne(type => Leacture, leacture => leacture.certificates)
    leacture: Leacture;

}
