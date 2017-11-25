CREATE OR REPLACE FUNCTION updateAction(
  actor integer,
  hashtagT text,
  isGood boolean,
  karma integer,
  dateIn date,
  updateActionId integer,
  OUT actionId integer)
AS $$
DECLARE
  hashtagFK integer;
BEGIN
  select hashtagid into hashtagFk from getOrCreateHashtag(hashtagT);
  if updateActionId is null then
    insert into action ("actor", "hashtag", "isGood", "karma", "recordedForDate")
    values (actor, hashtagFk, isGood, karma, dateIn) returning "id" into actionId;
  end if;
END; $$
LANGUAGE plpgsql;