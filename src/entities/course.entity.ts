import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: false })
    isPublished: boolean;

    @Column({ type: 'date', default: null, nullable: true })
    startsAt: Date | null;

    @Column({ type: 'date', default: null, nullable: true })
    endsAt: Date | null;

    @Column({ type: 'date', default: null, nullable: true })
    postedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
