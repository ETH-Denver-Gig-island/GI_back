CREATE SCHEMA IF NOT EXISTS gidb;
USE gidb;

-- Create DAO table
CREATE TABLE IF NOT EXISTS gidb.DAO
(
    id          INT          NOT NULL AUTO_INCREMENT, -- unique ID for each DAO
    address     VARCHAR(255) NOT NULL UNIQUE,         -- unique address for each DAO
    nickname    VARCHAR(255) NOT NULL,                -- DAO nickname
    wallet_type INT          NOT NULL DEFAULT 0,      -- wallet type, 0: metamask, 1: gnosis
    PRIMARY KEY (id)
) DEFAULT CHARSET = utf8 COMMENT ='Table for DAOs.';

-- Create Loan table
CREATE TABLE IF NOT EXISTS gidb.Loan
(
    id          INT          NOT NULL AUTO_INCREMENT, -- unique ID for each loan
    user_id     INT          NOT NULL,                -- borrower's user ID
    dao_id      INT          NOT NULL,                -- ID of the DAO being borrowed from
    load_status INT          NOT NULL DEFAULT 0,      -- status of the loan, 0: pending, 1: borrowed, 2: reject, 3: repayed
    amount      INT          NOT NULL,                -- amount borrowed
    token       VARCHAR(255) NOT NULL,                -- token used for the loan
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User (id),
    FOREIGN KEY (dao_id) REFERENCES DAO (id)
) DEFAULT CHARSET = utf8 COMMENT ='Table for loans requested by users to DAOs.';

-- Create WhiteUser table
CREATE TABLE IF NOT EXISTS gidb.DaoWork
(
    id         INT          NOT NULL AUTO_INCREMENT, -- unique ID for each registered user
    address    VARCHAR(255) NOT NULL UNIQUE,         -- unique address for each registered user
    dao_id     INT          NOT NULL,                -- ID of the DAO the user is registered to
    pay_amount INT          NOT NULL DEFAULT 0,      -- amount to be paid or already paid if overdue
    pay_date   DATE,                                 -- date payment is due
    user_role  VARCHAR(255) NOT NULL,                -- role, e.g. developer, project manager
    PRIMARY KEY (id),
    FOREIGN KEY (dao_id) REFERENCES DAO (id)
) DEFAULT CHARSET = utf8 COMMENT ='Table for users registered to DAOs.';

-- Create User table
CREATE TABLE IF NOT EXISTS gidb.User
(
    id        INT          NOT NULL AUTO_INCREMENT, -- unique user ID
    address   VARCHAR(255) NOT NULL UNIQUE,         -- unique user address
    signature VARCHAR(255) NOT NULL,                -- signature
    PRIMARY KEY (id)
) DEFAULT CHARSET = utf8 COMMENT ='Table for users.';

-- Create NFT table
CREATE TABLE IF NOT EXISTS gidb.NFT
(
    id       INT          NOT NULL AUTO_INCREMENT, -- unique ID for each NFT
    user_id  INT          NOT NULL,                -- ID of the owner of the NFT
    image    VARCHAR(255) NOT NULL,                -- S3 URI for image
    meta_url VARCHAR(255) NOT NULL,                -- IPFS URI
    mint_id  INT          NOT NULL,                -- ID for NFT minting
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User (id)
) DEFAULT CHARSET = utf8 COMMENT ='Table for NFTs.';
