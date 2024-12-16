import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productCode!: string;

  @Column()
  description!: string;

  @Column()
  location!: string;

  @Column('decimal')
  price!: number;
}
