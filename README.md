# Diet o'Fits – Modern Health & Diet SaaS Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🚀 Overview

**Diet o'Fits** is a robust, production-grade backend for a SaaS health, diet, and fitness platform. It leverages **NestJS**, **TypeORM** (PostgreSQL), **Mongoose** (MongoDB), and a modular, testable architecture for rapid feature development and reliability.

---

## 🏗️ Features

- **User Management**: Roles, profile, and subscription data
- **Metrics**: Daily/weekly health metrics, derived calculations (BMI, fat mass, etc.)
- **Meal Logging**: Per-meal food logs, validated against a food DB
- **Meal Plans**: Weekly plans assigned by dieticians/nutritionists
- **Checklist**: Daily adherence tracking (water, exercise, meal compliance)
- **Reports**: Weekly/monthly summaries, SaaS analytics
- **Health Checks**: `/healthz` endpoint for DB status
- **Swagger API Docs**: Interactive OpenAPI docs at `/api`
- **Extensible DB Driver Layer**: Unified health checks, initialization, and CRUD
- **Comprehensive Unit Tests**: Jest-based, modular, and easy to extend

---

## 🧩 Data Model

### Entities

- `User`: name, age, gender, height, goal, activityLevel, medicalConditions, roles
- `Subscription`: planType, status, trialEnd, renewalDate
- `MetricRecord`: userId, weight, fatMass, lbm, smm, waterPercent, timestamp
- `MealLog`: user, mealType, foods[], date
- `MealPlan`: user, plan[], startDate, endDate
- `Checklist`: user, waterIntake, exerciseDone, mealFollowed, date

### Relationships

- Users have many metrics, meal logs, checklists, subscriptions, and meal plans
- Meal plans and logs are per-user, per-day

---

## 🔌 API Endpoints

| Method | Path                    | Description                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | `/`                     | Hello World test endpoint    |
| GET    | `/healthz`              | Health check (DBs)           |
| POST   | `/meal-plan/:userId`    | Create meal plan for user    |
| GET    | `/meal-plan/:userId`    | Get meal plans for user      |
| DELETE | `/meal-plan/:id`        | Delete meal plan by ID       |
| POST   | `/meal-log/:userId`     | Create meal log for user     |
| GET    | `/meal-log/:userId`     | Get meal logs for user       |
| DELETE | `/meal-log/:id`         | Delete meal log by ID        |
| POST   | `/metrics`              | Add metric record            |
| GET    | `/metrics/:userId`      | Get metrics for user         |
| POST   | `/subscription/:userId` | Create subscription for user |
| GET    | `/subscription/:userId` | Get subscriptions for user   |
| DELETE | `/subscription/:id`     | Delete subscription by ID    |
| GET    | `/api`                  | Swagger API docs             |

---

## ⚙️ Technology Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/) (PostgreSQL)
- **ODM**: [Mongoose](https://mongoosejs.com/) (MongoDB)
- **Validation**: [class-validator](https://github.com/typestack/class-validator)
- **Testing**: [Jest](https://jestjs.io/)
- **API Docs**: [Swagger](https://swagger.io/)

---

## 🩺 Health Checks

- `/healthz` returns `{ postgres: 'ok'|'error', mongo: 'ok'|'error' }`
- Modular DB driver interface for extensible health, CRUD, and test logic

---

## 🧪 Testing

- Run all tests:
  ```bash
  npm test
  ```
- Unit tests for all services, repositories, and health checks

---

## 🛠️ Setup & Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and set DB URIs, ports, etc.
3. **Run the app:**
   ```bash
   npm run start:dev
   ```
4. **View API docs:**
   - Visit [http://localhost:3000/api](http://localhost:3000/api)
5. **Check health:**
   - Visit [http://localhost:3000/healthz](http://localhost:3000/healthz)

---

## 🧠 Extending & Customizing

- Add new DBs by implementing the `DatabaseDriver` interface
- Add new modules/services/controllers using NestJS CLI
- Use DTOs and validation for all request bodies
- Add more health checks or SaaS analytics as needed

---

## 📚 Project Structure

```
src/
  app.module.ts
  main.ts
  config/
    typeorm.config.ts
    mongoose.config.ts
  entities/
  interfaces/
  dtos/
  metrics/
  meal-log/
  meal-plan/
  checklist/
  subscription/
  healthz/
  repositories/
  schemas/
  test/
```

---

## 💡 Contributing

PRs and issues welcome! Please follow the code style and add tests for new features.

---

## 📝 License

MIT

---

## 📏 Flexible Metrics & Derived Calculations

The `MetricRecord` entity and metrics API are designed for maximum flexibility and extensibility:

- **Flexible Input:** The `/metrics` endpoint accepts any combination of observable and derived metric fields in the request body.
- **Builder Pattern:** All derived/calculated fields (e.g., BMI, bodyFatPercent, waistToHipRatio) are defined via a dependency DAG and mathjs formulas in the entity. No hardcoded logic—just add a formula and dependencies to extend.
- **Automatic Enrichment:** On every metric record creation, the service uses `MetricRecord.buildAll(record)` to calculate and enrich all possible derived fields, even if not present in the request.
- **Type-Safe & Robust:** The builder is fully type-safe, cycle-safe, and production-ready. All dynamic property access is checked, and extensibility is as simple as adding a new formula.
- **Multi-DB Save:** Enriched records are saved to both MongoDB and Postgres, with all calculated fields included.

### Example: Adding a New Derived Metric

To add a new derived metric (e.g., `fatFreeMassIndex`):

1. Add a public field to `MetricRecord` with a `@Column` decorator.
2. Add its dependencies and formula:
   ```ts
   static fieldDependencies = {
     ...existing code...
     fatFreeMassIndex: ['lbm', 'height'],
   };
   static formulas = {
     ...existing code...
     fatFreeMassIndex: 'lbm / (height * height)',
   };
   ```
3. That's it! The API will now accept, calculate, and persist this field automatically.

### Example Request

```json
POST /metrics
{
  "userId": 1,
  "weight": 80,
  "height": 1.8,
  "fatMass": 16
}
```

The response and stored record will include all derived fields (e.g., `bmi`, `bodyFatPercent`) calculated from the provided data.

---
