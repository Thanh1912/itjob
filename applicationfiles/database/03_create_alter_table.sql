use searchcareer;

alter table user add roleid bigint;

alter table user add constraint fk_user_role foreign key (roleid) references role(roleid);

alter table recruiter add constraint fk_recruiter_user foreign key (userid) references user(userid);
alter table recruiter add constraint fk_recruiter_companysize foreign key (companysizeid) references companysize(companysizeid);
alter table recruiter add constraint fk_recruiter_country foreign key (countryid) references country(countryid);

alter table post add constraint fk_post_recruiter foreign key (recruiterid) references recruiter(recruiterid);
alter table post add constraint fk_post_workplace foreign key (workplaceid) references workplace(workplaceid);
alter table post add constraint fk_post_district foreign key (districtid) references district(districtid);

alter table postkeyword add constraint fk_postkeyword_post foreign key (postid) references post(postid);
alter table postkeyword add constraint fk_postkeyword_keyword foreign key (keywordid) references keyword(keywordid);

alter table resume add constraint fk_resume_candidate foreign key (candidateid) references candidate(candidateid);

alter table candidate add constraint fk_candidate_user foreign key (userid) references user(userid);

alter table district add workplaceid bigint;

alter table district add constraint fk_district_workplace foreign key (workplaceid) references workplace(workplaceid);




