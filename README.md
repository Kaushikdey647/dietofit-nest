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

| Method | Path                        | Description                  |
|--------|-----------------------------|------------------------------|
| POST   | `/metrics/:userId`          | Add metric record            |
| GET    | `/metrics/:userId`          | Fetch user metrics           |
| POST   | `/meal-log/:userId`         | Add daily meal log           |
| GET    | `/meal-log/:userId`         | Fetch meal logs              |
| POST   | `/meal-plan/:userId`        | Add weekly meal plan         |
| GET    | `/meal-plan/:userId`        | Fetch meal plan              |
| POST   | `/checklist/:userId`        | Add daily checklist          |
| GET    | `/checklist/:userId`        | Fetch checklists             |
| GET    | `/healthz`                  | Health check (DBs)           |
| GET    | `/api`                      | Swagger API docs             |

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
