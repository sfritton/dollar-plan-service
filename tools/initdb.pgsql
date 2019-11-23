-- Drop tables
DROP TABLE IF EXISTS guitars; -- remove sample table
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS transactions;

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , month smallint NOT NULL
    , year smallint NOT NULL 
);

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , budgetId int NOT NULL
    , title varchar(50) NOT NULL
    , isIncome boolean NOT NULL
    , FOREIGN KEY (budgetId) REFERENCES budgets(id) ON DELETE CASCADE
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , groupId int NOT NULL
    , budgetId int NOT NULL
    , title varchar(50) NOT NULL
    , plannedAmount int NOT NULL
    , notes varchar(200) NULL
    , FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
    , FOREIGN KEY (budgetId) REFERENCES budgets(id) ON DELETE CASCADE
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , categoryId int NOT NULL
    , groupId int NOT NULL
    , budgetId int NOT NULL
    , amount int NOT NULL
    , date smallint NOT NULL
    , description varchar(200) NULL
    , FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
    , FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
    , FOREIGN KEY (budgetId) REFERENCES budgets(id) ON DELETE CASCADE
);