import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productCode!: string; // Add the '!' non-null assertion operator

  @Column()
  description!: string; // Add the '!' non-null assertion operator

  @Column()
  location!: string; // Add the '!' non-null assertion operator

  @Column('decimal')
  price!: number; // Add the '!' non-null assertion operator
}
