-- Select 语句

delete from beist.dbo.uw
delete from beist.dbo.ua
delete from beist.dbo.u

select count(*) from beist.dbo.W w where w.WORD_LEVEL = '六级'  -- 1339 from 11616
select count(*) from beist.dbo.W w where w.WORD_LEVEL = '四级'  -- 1321 from 7202
select count(*) from beist.dbo.W w where w.WORD_LEVEL = '高中'  -- 1324 from 3790
select count(*) from beist.dbo.W w where w.WORD_LEVEL = '初中'  -- 599  from 2004
select count(*) from beist.dbo.W w where w.WORD_LEVEL = '基础'  -- 1996  from 1

select * from beist.dbo.U
select * from beist.dbo.UW
select * from beist.dbo.W
select * from beist.dbo.UA
select * from beist.dbo.AW
select * from beist.dbo.A

update beist.dbo.u set Last_login_date = '2017-09-03'

delete from beist.dbo.uw where word_id < 4000
select * from beist.dbo.uw
