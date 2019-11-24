-- Drop tables
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS budgets;

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , month smallint NOT NULL
    , year smallint NOT NULL 
);

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , budget_id int NOT NULL
    , title varchar(50) NOT NULL
    , is_income boolean NOT NULL
    , sort int NOT NULL
    , FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , group_id int NOT NULL
    , budget_id int NOT NULL
    , title varchar(50) NOT NULL
    , planned_amount int NOT NULL
    , notes varchar(200) NULL
    , sort int NOT NULL
    , FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
    , FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , category_id int NOT NULL
    , group_id int NOT NULL
    , budget_id int NOT NULL
    , amount int NOT NULL
    , date smallint NOT NULL
    , description varchar(200) NULL
    , FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    , FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
    , FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
);