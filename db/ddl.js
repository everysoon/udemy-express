
CREATE TABLE tours(
	id int auto_increment NOT NULL primary key,
	name varchar(255) NOT NULL,
	duration int not null,
	maxGroupSize int NOT NULL,
	difficulty varchar(255) NOT NULL,
	ratingsAverage decimal default 0,
	ratingsQuantity int default 0,
	price int default 0,
	summary varchar(255) NOT NULL,
	description varchar(1000) NOT NULL,
	imageCover varchar(255) NOT NULL,
	images json NOT NULL,
	startDates json NOT NULL
);
CREATE TABLE users(
	id int auto_increment NOT NULL primary key,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	user_role varchar(255) default 'user' NOT NULL,
	active boolean,
	photo varchar(255) not null,
	pwd varchar(255) not null
);

create table review(
	id int auto_increment NOT NULL primary key,
	review varchar(255) not null,
	rating int default 0 not null,
	user_id int not null,
	tour_id int not null,
	FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (tour_id) REFERENCES tours(id) ON UPDATE CASCADE ON DELETE RESTRICT
)