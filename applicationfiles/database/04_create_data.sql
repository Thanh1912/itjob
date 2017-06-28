use searchcareer;

insert into companysize(name) value('1-10');
insert into companysize(name) value('11-20');
insert into companysize(name) value('21-50');
insert into companysize(name) value('51-100');
insert into companysize(name) value('101-150');
insert into companysize(name) value('150-300');
insert into companysize(name) value('300+');

select * from companysize;

insert into workplace(name) value('Hà Nội');
insert into workplace(name) value('TP HCM');
insert into workplace(name) value('Đà nẵng');

select * from workplace;

insert into country(name) value('America');
insert into country(name) value('Japan');
insert into country(name) value('Viet Nam');
insert into country(name) value('switchland');
insert into country(name) value('canada');
insert into country(name) value('korea');

select * from country;

insert into role(name) value('ADMIN');
insert into role(name) value('CANDIDATE');
insert into role(name) value('RECRUITER');

select * from district;

insert into district(name, workplaceid) value('Quận Ba Đình',1);
insert into district(name, workplaceid) value('Quận Hoàn Kiếm',1);
insert into district(name, workplaceid) value('Quận Hai Bà Trưng',1);
insert into district(name, workplaceid) value('Quận Đống Đa',1);
insert into district(name, workplaceid) value('Quận Tây Hồ',1);

insert into district(name, workplaceid) value('Quận 1',2);
insert into district(name, workplaceid) value('Quận 2',2);
insert into district(name, workplaceid) value('Quận 3',2);
insert into district(name, workplaceid) value('Quận 4',2);
insert into district(name, workplaceid) value('Quận 9',2);

insert into district(name, workplaceid) value('Quận Hải Châu',3);
insert into district(name, workplaceid) value('Quận Thanh Khê',3);
insert into district(name, workplaceid) value('Quận Sơn Trà',3);
insert into district(name, workplaceid) value('Quận Ngũ Hành Sơn',3);

insert into keyword(name) value('JAVA');
insert into keyword(name) value('C#');
insert into keyword(name) value('.NET');
insert into keyword(name) value('BA');
insert into keyword(name) value('QA/QC');
insert into keyword(name) value('SQL');
insert into keyword(name) value('WEB');
insert into keyword(name) value('MOBILE');





















