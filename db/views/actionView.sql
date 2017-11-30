CREATE OR REPLACE VIEW actionView
AS
select "actor", "isGood", "karma", "realText" as "hashtag", "recordedForDate" 
from action join hashtag
on action."hashtag" = hashtag.id;