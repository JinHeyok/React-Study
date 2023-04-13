USE react_project;

-- DROP TABLE store_USER;
-- DROP TABLE store_category;
-- DROP TABLE store_product;

CREATE TABLE store_User(
	su_index int unsigned not null AUTO_INCREMENT,
	su_id varchar(100) not null,
    su_pw varchar(100) not null,
	constraint primary key(su_index)
);


CREATE TABLE store_category(
    sc_index int unsigned not null auto_increment,
    sc_categoryName varchar(100) not null,
    constraint primary key (sc_index)
);

CREATE TABLE store_product(
	sp_index int unsigned not null auto_increment,
    sc_index int unsigned not null,
    sp_name varchar(200) not null,
    sp_summary varchar(255) not null,
    sp_price varchar(200) not null,
    sp_thumbnail varchar(200) not null,
    sp_image varchar(255),
    sp_visit int unsigned default 0,
    sp_able int not null default 0,
    constraint primary key (sp_index),
    constraint foreign key (sc_index) REFERENCES store_category(sc_index) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO store_category VALUES (1 , "상의");
INSERT INTO store_category VALUES (2 , "하의");
INSERT INTO store_category VALUES (3 , '액세사리');
INSERT INTO store_category VALUES (4 , '아우터');
INSERT INTO store_category VAlUES (5, '스니커즈');
