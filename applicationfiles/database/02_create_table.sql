use searchcareer;

create table user (
	userid bigint not null primary key auto_increment,
    username varchar(255) not null,
    password varchar(255) not null,
    createddate timestamp
);
create table role (
	roleid bigint not null primary key auto_increment,
    name varchar(255) not null
);

create table recruiter (
	recruiterid bigint not null primary key auto_increment,
    email varchar(255),
    website varchar(255),
    facebook varchar(255),
    phone varchar(255),
    introduction text,
    logo varchar(255),
    profileimage varchar(255),
    address text,
    userid bigint not null,
    companysizeid bigint not null,
    countryid bigint not null
);

create table post (
	postid bigint not null primary key auto_increment,
    title varchar(510),
    salarycompete varchar(255),
    salarybegin integer,
    salaryend integer,
    descriptionwork text,
    requirementwork text,
    postimage varchar(255),
    workplaceid bigint,
    districtid bigint,
    recruiterid bigint
);

create table companysize(
	companysizeid bigint not null primary key auto_increment,
    name varchar(510)
);

create table country(
	countryid bigint not null primary key auto_increment,
    name varchar(255)
);

create table workplace(
	workplaceid bigint not null primary key auto_increment,
    name varchar(255)
);

create table district(
	districtid bigint not null primary key auto_increment,
    name varchar(510)
);

create table keyword(
	keywordid bigint not null primary key auto_increment,
    name varchar(255)
);

create table postkeyword(
	postkeywordid bigint not null primary key auto_increment,
    postid bigint,
    keywordid bigint
);

create table candidate(
	candidateid bigint not null primary key auto_increment,
    email varchar(255),
    fullname varchar(510),
    profileimage varchar(255),
    userid bigint
);

create table resume(
	 resumeid bigint not null primary key auto_increment,
    pathresume varchar(510),
    candidateid bigint
);


















