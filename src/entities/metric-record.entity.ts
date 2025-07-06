import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { evaluate } from 'mathjs';

@Entity()
export class MetricRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // Observable metrics
  @Column({
    type: 'float',
    comment: 'Body weight in kilograms (measured)',
    nullable: false,
  })
  weight?: number;

  @Column({
    type: 'float',
    comment: 'Fat mass in kilograms (measured)',
    nullable: false,
  })
  fatMass?: number;

  @Column({
    type: 'float',
    comment: 'Lean body mass in kilograms (measured)',
    nullable: true,
  })
  lbm?: number;

  @Column({
    type: 'float',
    comment: 'Skeletal muscle mass in kilograms (measured)',
    nullable: true,
  })
  smm?: number;

  @Column({
    type: 'float',
    comment: 'Body water percentage (measured)',
    nullable: true,
  })
  waterPercent?: number;

  @Column({
    type: 'float',
    comment: 'Waist circumference in centimeters (measured)',
    nullable: true,
  })
  waistCircumference?: number;

  @Column({
    type: 'float',
    comment: 'Hip circumference in centimeters (measured)',
    nullable: true,
  })
  hipCircumference?: number;

  @Column({
    type: 'float',
    comment: 'Neck circumference in centimeters (measured)',
    nullable: true,
  })
  neckCircumference?: number;

  // Calculated metrics (must be public for legacy decorators)
  @Column({
    type: 'float',
    nullable: true,
    comment: 'Body Mass Index (calculated: weight / height^2)',
  })
  bmi?: number;

  @Column({
    type: 'float',
    nullable: true,
    comment: 'Body fat percentage (calculated or measured)',
  })
  bodyFatPercent?: number;

  @Column({
    type: 'float',
    nullable: true,
    comment:
      'Waist-to-hip ratio (calculated: waistCircumference / hipCircumference)',
  })
  waistToHipRatio?: number;

  @Column({
    type: 'float',
    nullable: true,
    comment: 'Basal Metabolic Rate (calculated)',
  })
  bmr?: number;

  @Column({
    type: 'float',
    nullable: true,
    comment: 'Total Daily Energy Expenditure (calculated)',
  })
  tdee?: number;

  // --- Builder logic ---
  static fieldDependencies: Record<string, string[]> = {
    bmi: ['weight', 'height'],
    bodyFatPercent: ['fatMass', 'weight'],
    waistToHipRatio: ['waistCircumference', 'hipCircumference'],
    // Add more as needed
  };

  static formulas: Record<string, string> = {
    bmi: 'weight / (height * height)',
    bodyFatPercent: '(fatMass / weight) * 100',
    waistToHipRatio: 'waistCircumference / hipCircumference',
    // Add more as needed
  };

  /**
   * Type-safe builder for derived/calculated fields.
   * Calculates the value for a given field, using dependencies and formulas.
   * Ensures all dependencies are built first, and all possible derived fields can be calculated.
   */
  static build<
    T extends MetricRecord & { [key: string]: any },
    K extends keyof T | string,
  >(field: K, record: T, visited: Set<string> = new Set()): number | null {
    if (visited.has(field as string)) return null; // Prevent cycles
    visited.add(field as string);
    // If already set, return value
    if (typeof record[field as keyof T] === 'number') {
      // Type assertion: we only return if it's a number
      return record[field as keyof T] as number;
    }
    // Build dependencies first
    const deps = this.fieldDependencies[field as string] || [];
    for (const dep of deps) {
      if (typeof record[dep] !== 'number') {
        // Try to build dependency if it's calculatable
        if (this.formulas[dep]) {
          this.build(dep, record, visited);
        }
      }
    }
    // Now try to calculate using formula
    const formula = this.formulas[field as string];
    if (formula) {
      try {
        // Prepare variables for mathjs
        const scope: Record<string, number> = {};
        for (const dep of deps) {
          scope[dep] = Number(record[dep]);
        }
        // Also allow direct fields
        for (const key of Object.keys(record)) {
          const val: unknown = record[key];
          if (typeof val === 'number') {
            scope[key] = val;
          }
        }
        const value = evaluate(formula, scope) as number;
        if (typeof value === 'number' && !isNaN(value)) {
          // Type assertion: we know the field is a number property
          (record as Record<string, unknown>)[field as string] = value;
          return value;
        }
      } catch {
        // Ignore mathjs errors, return null
      }
    }
    return null;
  }

  /**
   * Utility to build all derived/calculated fields for a record.
   * Ensures all possible formulas are evaluated and included in the record.
   */
  static buildAll<T extends MetricRecord & { [key: string]: any }>(
    record: T,
  ): T {
    for (const field of Object.keys(this.formulas)) {
      this.build(field, record);
    }
    return record;
  }
}
