USE [IQuiz_Db]
GO

SET IDENTITY_INSERT [dbo].[QuestionsAndAnswers] ON

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (1
		   ,'What is the capital of Spain?'
           ,'Madrid'
           ,'Berlin'
           ,'Rome'
           ,'London'
           ,'Madrid'
           ,1
           ,'https://icons.iconarchive.com/icons/unclebob/spanish-travel/256/madrid-bear-and-tree-icon.png')

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (2
		   ,'After Alaska, which U.S. state has the longest coastline?'
           ,'New York'
           ,'Texas'
           ,'California'
           ,'Florida'
           ,'Florida'
           ,1
           ,'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/1501841_1438329046398401_911914077_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=GggCiPkoVb4AX-bFMoM&_nc_ht=scontent-arn2-1.xx&oh=974f15c200625d28109fce183e5c2024&oe=5F3B0E18')

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (3
		   ,'What country is home to the tallest mountain in the world, Mount Everest?'
           ,'China'
           ,'Tibet'
           ,'Nepal'
           ,'India'
           ,'Nepal'
           ,1
           ,'https://cdn.iconscout.com/icon/premium/png-256-thumb/nepal-40-286959.png')

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (4
		   ,'What country has the largest population in the world?'
           ,'India'
           ,'China'
           ,'U.S.A'
           ,'Indonesia'
           ,'China'
           ,1
           ,'https://cdn.iconscout.com/icon/premium/png-256-thumb/china-map-2029940-1710785.png')

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (5
		   ,'What is the largest U.S. state by area?'
           ,'Texas'
           ,'Mississippi'
           ,'Alaska'
           ,'Alabama'
           ,'Alaska'
           ,1
           ,'https://mmo.aiircdn.com/209/5ed5b50c8b239.png')

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (6
		   ,'What is the name of the highest uninterrupted waterfall in the world?'
           ,'Niagara falls'
           ,'Victoria Falls'
           ,'Yosemite Falls'
           ,'Angel Falls'
           ,'Angel Falls'
           ,1
           ,'https://a.wattpad.com/useravatar/hufflepuffgurl.256.662612.jpg')

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (7
		   ,'By area, what is the smallest country in the world?'
           ,'Monaco'
           ,'Vatican City'
           ,'Gibraltar (United Kingdom)'
           ,'Cook Islands '
           ,'Vatican City'
           ,1
           ,'data:image/jpeg;base64,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')

GO

INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
     VALUES
           (8
		   ,'What is the capital city of Australia?'
           ,'Canberra'
           ,'Sydney'
           ,'Melbourne'
           ,'Brisbane'
           ,'Canberra'
           ,1
           ,'https://upload.wikimedia.org/wikipedia/commons/5/53/Canberra_1999.png')

GO

SET IDENTITY_INSERT [dbo].[QuestionsAndAnswers] ON
INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
VALUES
           (9
		   ,'What is the only country that borders the United Kingdom?'
           ,'Ireland'
           ,'Scotland'
           ,'Northern Ireland'
           ,'Wales'
           ,'Ireland'
           ,1
           ,'https://www.le-vpn.com/wp-content/uploads/2017/08/Ireland.png')
SET IDENTITY_INSERT [dbo].[QuestionsAndAnswers] OFF

GO

SET IDENTITY_INSERT [dbo].[QuestionsAndAnswers] ON
INSERT INTO [dbo].[QuestionsAndAnswers]
           ([Id]
		   ,[Question]
           ,[Answer_1]
           ,[Answer_2]
           ,[Answer_3]
           ,[Answer_4]
           ,[CorrectAnswer]
           ,[Points]
           ,[ImageUrl])
VALUES
           (10
		   ,'In which country would you find the city of Dresden?'
           ,'Austria'
           ,'Germany'
           ,'Switzerland'
           ,'Belgium'
           ,'Germany'
           ,1
           ,'https://www.katthult.se/wp-content/uploads/2015/05/Germany.png')
SET IDENTITY_INSERT [dbo].[QuestionsAndAnswers] OFF

GO