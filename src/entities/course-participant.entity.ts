import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @Column({ name: 'courseId', select: false })
    readonly courseId: number;
}
