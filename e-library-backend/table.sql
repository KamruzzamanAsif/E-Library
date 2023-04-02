create table user (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(50),
    roll varchar(20),
    batch varchar(10),
    session varchar(10),
    program_level varchar(10),
    mobile_number varchar(30),
    address varchar(250),
    email varchar(250),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user (name, mobile_number, email, password, status, role) 
values ('admin', '01766610087', 'cooldev1204@gmail.com', 'CoolDev#1204', 'true', 'admin');

ALTER TABLE user RENAME COLUMN addres TO address;

