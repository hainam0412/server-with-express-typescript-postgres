# System Requirement

Node version: v18.2.0
Linux: (Ubuntu 20.04)

## Setup

- Postgres SQL:

```bash
# Step 1 — Installing PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service

# Step 2 — Using PostgreSQL Roles and Databases
sudo -i -u postgres

# Step 3 — Creating a New Role
sudo -u postgres createuser --interactive

# Output
# Enter name of role to add: sammy
# Shall the new role be a superuser? (y/n) y

# Step 4 — Creating a New Database
createdb sammy
```

- Config env:

```bash
cp .env.example .env

# Modify .env variable

# Install node modules
npm install
```

### Running project

```bash
npm run dev
```
