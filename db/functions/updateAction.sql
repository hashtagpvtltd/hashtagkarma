CREATE OR REPLACE FUNCTION updateAction(
  actor integer,
  hashtagT text,
  isGood boolean,
  _karma integer,
  dateIn date,
  updateActionId integer,
  OUT actionId integer,
  OUT totalKarma integer)
AS $$
DECLARE
  hashtagFK integer;
BEGIN
  select hashtagid into hashtagFk from getOrCreateHashtag(hashtagT);
  if updateActionId is null then
    insert into action ("actor", "hashtag", "isGood", "karma", "recordedForDate")
    values (actor, hashtagFk, isGood, _karma, dateIn) returning "id" into actionId;
  else 
    update action
    set "hashtag"=hashtagFk,
    "karma"=_karma
    where "id" = updateActionId;
    actionId := updateActionId;
  end if;
  select total into totalKarma from getKarma(actor);
END; $$
LANGUAGE plpgsql;