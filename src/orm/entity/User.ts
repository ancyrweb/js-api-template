import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Validable, { ConstraintBuilder, Constraint } from "../../validation/Validable";

@Entity()
export class User implements Validable {
    getConstraints(builder: ConstraintBuilder): Constraint {
        return builder.object().keys({
            emailAddress: builder.string().email({ minDomainAtoms: 2 }),
            password: builder
        })
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    emailAddress: string;

    @Column()
    password: string;
}
