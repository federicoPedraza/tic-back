import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CoursePrice } from './course-price.entity';
import { CourseParticipant } from './course-participant.entity';
import { CourseReview } from './course-review.entity';

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: false })
    isPublished: boolean;

    @Column({ type: 'timestamp', default: null, nullable: true })
    startsAt: Date | null;

    @Column({ type: 'timestamp', default: null, nullable: true })
    endsAt: Date | null;

    @Column({ type: 'timestamp', default: null, nullable: true })
    postedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => CoursePrice, coursePrice => coursePrice.course)
    prices: CoursePrice[];

    @OneToMany(() => CourseReview , courseReview => courseReview.course)
    reviews: CourseReview[];

    @OneToMany(() => CourseParticipant, courseParticipant => courseParticipant.course)
    participants: CourseParticipant[];

    hasEnded(): boolean {
        return this.endsAt !== null && this.endsAt < new Date();
    }

    hasStarted(): boolean {
        return this.startsAt !== null && this.startsAt  < new Date();
    }

    isOngoing(): boolean {
        return this.hasStarted() && !this.hasEnded();
    }
}
