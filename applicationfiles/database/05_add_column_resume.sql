ALTER TABLE resume ADD recruiterid BIGINT;

ALTER TABLE resume ADD status INT;
-- 1: approve
-- 2: waiting interview
-- 3: pass
-- 4: fail
--5: hire
ALTER TABLE resume ADD createddate TIMESTAMP;
ALTER TABLE resume ADD modifieddate TIMESTAMP;
