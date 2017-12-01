CREATE OR REPLACE VIEW actionView
AS
select "actor", action."id", "isGood", "karma", "realText" as "hashtag", "recordedForDate" 
from action join hashtag
on action."hashtag" = hashtag.id
order by "id" asc