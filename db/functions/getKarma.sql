CREATE OR REPLACE FUNCTION getKarma(
  actorId integer,
  OUT total integer)
AS $$
DECLARE
  goodKarma integer;
  badKarma integer;
BEGIN
  select COALESCE(sum("karma"),0) into goodKarma from action where "actor" = actorId and "isGood" = true;
  select COALESCE(sum("karma"),0) into badKarma from action where "actor" = actorId and "isGood" = false;
  total := goodKarma - badKarma;
END; $$
LANGUAGE plpgsql;


