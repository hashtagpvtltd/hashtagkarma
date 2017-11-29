CREATE OR REPLACE FUNCTION getKarma(
  actorId integer,
  OUT total integer)
AS $$
DECLARE
  goodKarma integer;
  badKarma integer;
BEGIN
  select sum("karma") into goodKarma from action where "actor" = actorId and "isGood" = true;
  select sum("karma") into badKarma from action where "actor" = actorId and "isGood" = false;
  total := goodKarma - badKarma;
END; $$
LANGUAGE plpgsql;


