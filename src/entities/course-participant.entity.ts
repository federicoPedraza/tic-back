import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity({ name: 'course_participants' })
export class CourseParticipant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ type: 'boolean', default: false })
    isConfirmed: boolean;

    @Column({ type: 'boolean', default: false })
    isPaid: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Course, course => course.participants)
    course: Course;
}
