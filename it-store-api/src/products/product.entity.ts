import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120})
    name: string;

    @Column({length: 120})
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ length: 500, nullable: true })
    imageUrl: string;
}