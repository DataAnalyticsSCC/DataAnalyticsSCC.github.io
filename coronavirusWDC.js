(function () {

	var myConnector = tableau.makeConnector();
		
	myConnector.getSchema = function(schemaCallback) {
		loadJSON("schema.json", function(response) {
			schema = JSON.parse(response)
	
			var regionTableSchema = {
				id: "regions",
				columns: schema.regions
			};		
			var nationalTableSchema = {
				id: "nations",
				columns: schema.nations
			};		
			var utlaTableSchema = {
				id: "upper_tier_local_authority",
				columns: schema.utlaLtla
			};
			var ltlaTableSchema = {
				id: "lower_tier_local_authority",
				columns: schema.utlaLtla
			};		
			schemaCallback([nationalTableSchema, regionTableSchema, utlaTableSchema, ltlaTableSchema])
		});
	};

	myConnector.getData = function(table, doneCallback) {
		loadJSON("places.json", function(response) {
			data = JSON.parse(response);
			var nationNames = data.nation;
			var regionNames = data.region;
			var utlaNames = data.utla; 
			var ltlaNames = data.ltla; 
			
			if (table.tableInfo.id == 'nations') {
				var nationalCount = 0;
				for (var n = 0; n < nationNames.length; n++) {
					var endpoint = 
						'https://api.coronavirus.data.gov.uk/v1/data?' +
						'filters=areaType=nation;areaName=' + nationNames[n] +
						'&structure={"newCases":"newCasesByPublishDate","areaType":"areaType","areaName":"areaName","areaCode":"areaCode","date":"date","hash":"hash","cumCasesBySpecimenDateRate":"cumCasesBySpecimenDateRate","newCasesBySpecimenDate":"newCasesBySpecimenDate","cumCasesBySpecimenDateRate":"cumCasesBySpecimenDateRate","cumCasesBySpecimenDate":"cumCasesBySpecimenDate","maleCases":"maleCases","femaleCases":"femaleCases","newPillarOneTestsByPublishDate":"newPillarOneTestsByPublishDate","cumPillarOneTestsByPublishDate":"cumPillarOneTestsByPublishDate","newPillarTwoTestsByPublishDate":"newPillarTwoTestsByPublishDate","cumPillarTwoTestsByPublishDate":"cumPillarTwoTestsByPublishDate","newPillarThreeTestsByPublishDate":"newPillarThreeTestsByPublishDate","cumPillarThreeTestsByPublishDate":"cumPillarThreeTestsByPublishDate","newPillarFourTestsByPublishDate":"newPillarFourTestsByPublishDate","cumPillarFourTestsByPublishDate":"cumPillarFourTestsByPublishDate","newAdmissions":"newAdmissions","cumAdmissions":"cumAdmissions","cumAdmissionsByAge":"cumAdmissionsByAge","cumTestsByPublishDate":"cumTestsByPublishDate","newTestsByPublishDate":"newTestsByPublishDate","covidOccupiedMVBeds":"covidOccupiedMVBeds","hospitalCases":"hospitalCases","plannedCapacityByPublishDate":"plannedCapacityByPublishDate","newDeaths28DaysByPublishDate":"newDeaths28DaysByPublishDate","cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate","cumDeaths28DaysByPublishDateRate":"cumDeaths28DaysByPublishDateRate","newDeaths28DaysByDeathDate":"newDeaths28DaysByDeathDate","cumDeaths28DaysByDeathDate":"cumDeaths28DaysByDeathDate","cumDeaths28DaysByDeathDateRate":"cumDeaths28DaysByDeathDateRate"}'
					;
					$.getJSON(endpoint, function(resp) {
						var feat = resp.data,
							tableData = []
							
						for (var i = 0, len = feat.length; i < len; i++) {
							tableData.push({
								"date": feat[i].date,
								"newCases": feat[i].newCases, 
								"areaCode": feat[i].areaCode,
								"areaName": feat[i].areaName, 
								"areaType": feat[i].areaType, 
								"hash": feat[i].hash,
								"cumCasesBySpecimenDateRate": feat[i].cumCasesBySpecimenDateRate,
								"newCasesBySpecimenDate": feat[i].newCasesBySpecimenDate,
								"cumCasesBySpecimenDate": feat[i].cumCasesBySpecimenDate, 
								"female_0_to_4_value": parseNested(feat[i].femaleCases, 'age', 'value','0_to_4'),
								"female_5_to_9_value": parseNested(feat[i].femaleCases, 'age', 'value','5_to_9'),	
								"female_10_to_14_value": parseNested(feat[i].femaleCases, 'age', 'value','10_to_14'),	
								"female_15_to_19_value": parseNested(feat[i].femaleCases, 'age', 'value','15_to_19'),	
								"female_20_to_24_value": parseNested(feat[i].femaleCases, 'age', 'value','20_to_24'),	
								"female_25_to_29_value": parseNested(feat[i].femaleCases, 'age', 'value','25_to_29'),		
								"female_30_to_34_value": parseNested(feat[i].femaleCases, 'age', 'value','30_to_34'),	
								"female_35_to_39_value": parseNested(feat[i].femaleCases, 'age', 'value','35_to_39'),	
								"female_40_to_44_value": parseNested(feat[i].femaleCases, 'age', 'value','40_to_44'),	
								"female_45_to_49_value": parseNested(feat[i].femaleCases, 'age', 'value','45_to_49'),
								"female_50_to_54_value": parseNested(feat[i].femaleCases, 'age', 'value','50_to_54'),	
								"female_55_to_59_value": parseNested(feat[i].femaleCases, 'age', 'value','55_to_59'),
								"female_60_to_64_value": parseNested(feat[i].femaleCases, 'age', 'value','60_to_64'),	
								"female_65_to_69_value": parseNested(feat[i].femaleCases, 'age', 'value','65_to_69'),
								"female_70_to_74_value": parseNested(feat[i].femaleCases, 'age', 'value','70_to_74'),	
								"female_75_to_79_value": parseNested(feat[i].femaleCases, 'age', 'value','75_to_79'),
								"female_80_to_84_value": parseNested(feat[i].femaleCases, 'age', 'value','80_to_84'),	
								"female_85_to_89_value": parseNested(feat[i].femaleCases, 'age', 'value','85_to_89'),	
								"female_90plus_value": parseNested(feat[i].femaleCases, 'age', 'value','90+'),			
								"female_0_to_4_rate": parseNested(feat[i].femaleCases, 'age', 'rate','0_to_4'),
								"female_5_to_9_rate": parseNested(feat[i].femaleCases, 'age', 'rate','5_to_9'),	
								"female_10_to_14_rate": parseNested(feat[i].femaleCases, 'age', 'rate','10_to_14'),	
								"female_15_to_19_rate": parseNested(feat[i].femaleCases, 'age', 'rate','15_to_19'),	
								"female_20_to_24_rate": parseNested(feat[i].femaleCases, 'age', 'rate','20_to_24'),	
								"female_25_to_29_rate": parseNested(feat[i].femaleCases, 'age', 'rate','25_to_29'),		
								"female_30_to_34_rate": parseNested(feat[i].femaleCases, 'age', 'rate','30_to_34'),	
								"female_35_to_39_rate": parseNested(feat[i].femaleCases, 'age', 'rate','35_to_39'),	
								"female_40_to_44_rate": parseNested(feat[i].femaleCases, 'age', 'rate','40_to_44'),	
								"female_45_to_49_rate": parseNested(feat[i].femaleCases, 'age', 'rate','45_to_49'),
								"female_50_to_54_rate": parseNested(feat[i].femaleCases, 'age', 'rate','50_to_54'),	
								"female_55_to_59_rate": parseNested(feat[i].femaleCases, 'age', 'rate','55_to_59'),
								"female_60_to_64_rate": parseNested(feat[i].femaleCases, 'age', 'rate','60_to_64'),	
								"female_65_to_69_rate": parseNested(feat[i].femaleCases, 'age', 'rate','65_to_69'),
								"female_70_to_74_rate": parseNested(feat[i].femaleCases, 'age', 'rate','70_to_74'),	
								"female_75_to_79_rate": parseNested(feat[i].femaleCases, 'age', 'rate','75_to_79'),
								"female_80_to_84_rate": parseNested(feat[i].femaleCases, 'age', 'rate','80_to_84'),	
								"female_85_to_89_rate": parseNested(feat[i].femaleCases, 'age', 'rate','85_to_89'),	
								"female_90plus_rate": parseNested(feat[i].femaleCases, 'age', 'rate','90+'),																																																
								"male_0_to_4_value": parseNested(feat[i].maleCases, 'age', 'value','0_to_4'),
								"male_5_to_9_value": parseNested(feat[i].maleCases, 'age', 'value','5_to_9'),	
								"male_10_to_14_value": parseNested(feat[i].maleCases, 'age', 'value','10_to_14'),	
								"male_15_to_19_value": parseNested(feat[i].maleCases, 'age', 'value','15_to_19'),	
								"male_20_to_24_value": parseNested(feat[i].maleCases, 'age', 'value','20_to_24'),	
								"male_25_to_29_value": parseNested(feat[i].maleCases, 'age', 'value','25_to_29'),		
								"male_30_to_34_value": parseNested(feat[i].maleCases, 'age', 'value','30_to_34'),	
								"male_35_to_39_value": parseNested(feat[i].maleCases, 'age', 'value','35_to_39'),	
								"male_40_to_44_value": parseNested(feat[i].maleCases, 'age', 'value','40_to_44'),	
								"male_45_to_49_value": parseNested(feat[i].maleCases, 'age', 'value','45_to_49'),
								"male_50_to_54_value": parseNested(feat[i].maleCases, 'age', 'value','50_to_54'),	
								"male_55_to_59_value": parseNested(feat[i].maleCases, 'age', 'value','55_to_59'),
								"male_60_to_64_value": parseNested(feat[i].maleCases, 'age', 'value','60_to_64'),	
								"male_65_to_69_value": parseNested(feat[i].maleCases, 'age', 'value','65_to_69'),
								"male_70_to_74_value": parseNested(feat[i].maleCases, 'age', 'value','70_to_74'),	
								"male_75_to_79_value": parseNested(feat[i].maleCases, 'age', 'value','75_to_79'),
								"male_80_to_84_value": parseNested(feat[i].maleCases, 'age', 'value','80_to_84'),	
								"male_85_to_89_value": parseNested(feat[i].maleCases, 'age', 'value','85_to_89'),	
								"male_90plus_value": parseNested(feat[i].maleCases, 'age', 'value','90+'),			
								"male_0_to_4_rate": parseNested(feat[i].maleCases, 'age', 'rate','0_to_4'),
								"male_5_to_9_rate": parseNested(feat[i].maleCases, 'age', 'rate','5_to_9'),	
								"male_10_to_14_rate": parseNested(feat[i].maleCases, 'age', 'rate','10_to_14'),	
								"male_15_to_19_rate": parseNested(feat[i].maleCases, 'age', 'rate','15_to_19'),	
								"male_20_to_24_rate": parseNested(feat[i].maleCases, 'age', 'rate','20_to_24'),	
								"male_25_to_29_rate": parseNested(feat[i].maleCases, 'age', 'rate','25_to_29'),		
								"male_30_to_34_rate": parseNested(feat[i].maleCases, 'age', 'rate','30_to_34'),	
								"male_35_to_39_rate": parseNested(feat[i].maleCases, 'age', 'rate','35_to_39'),	
								"male_40_to_44_rate": parseNested(feat[i].maleCases, 'age', 'rate','40_to_44'),	
								"male_45_to_49_rate": parseNested(feat[i].maleCases, 'age', 'rate','45_to_49'),
								"male_50_to_54_rate": parseNested(feat[i].maleCases, 'age', 'rate','50_to_54'),	
								"male_55_to_59_rate": parseNested(feat[i].maleCases, 'age', 'rate','55_to_59'),
								"male_60_to_64_rate": parseNested(feat[i].maleCases, 'age', 'rate','60_to_64'),	
								"male_65_to_69_rate": parseNested(feat[i].maleCases, 'age', 'rate','65_to_69'),
								"male_70_to_74_rate": parseNested(feat[i].maleCases, 'age', 'rate','70_to_74'),	
								"male_75_to_79_rate": parseNested(feat[i].maleCases, 'age', 'rate','75_to_79'),
								"male_80_to_84_rate": parseNested(feat[i].maleCases, 'age', 'rate','80_to_84'),	
								"male_85_to_89_rate": parseNested(feat[i].maleCases, 'age', 'rate','85_to_89'),	
								"male_90plus_rate": parseNested(feat[i].maleCases, 'age', 'rate','90+'),
								"newPillarOneTestsByPublishDate": feat[i].newPillarOneTestsByPublishDate,	
								"cumPillarOneTestsByPublishDate": feat[i].cumPillarOneTestsByPublishDate,
								"newPillarTwoTestsByPublishDate": feat[i].newPillarTwoTestsByPublishDate,
								"cumPillarTwoTestsByPublishDate": feat[i].cumPillarTwoTestsByPublishDate, 
								"newPillarThreeTestsByPublishDate": feat[i].newPillarThreeTestsByPublishDate,
								"cumPillarThreeTestsByPublishDate": feat[i].cumPillarThreeTestsByPublishDate,
								"newPillarFourTestsByPublishDate": feat[i].newPillarFourTestsByPublishDate,
								"cumPillarFourTestsByPublishDate": feat[i].cumPillarFourTestsByPublishDate,
								"newAdmissions": feat[i].newAdmissions, 
								"cumAdmissions": feat[i].cumAdmissions,
								"cumAdmissionsByAge": feat[i].cumAdmissionsByAge, 
								"cumTestsByPublishDate": feat[i].cumTestsByPublishDate, 
								"newTestsByPublishDate": feat[i].newTestsByPublishDate,
								"covidOccupiedMVBeds": feat[i].covidOccupiedMVBeds,
								"hospitalCases": feat[i].hospitalCases,
								"plannedCapacityByPublishDate": feat[i].plannedCapacityByPublishDate, 
								"newDeaths28DaysByPublishDate": feat[i].newDeaths28DaysByPublishDate,
								"cumDeaths28DaysByPublishDate": feat[i].cumDeaths28DaysByPublishDate,
								"cumDeaths28DaysByPublishDateRate": feat[i].cumDeaths28DaysByPublishDateRate,	
								"newDeaths28DaysByDeathDate": feat[i].newDeaths28DaysByDeathDate,
								"cumDeaths28DaysByDeathDate": feat[i].cumDeaths28DaysByDeathDate,
								"cumDeaths28DaysByDeathDateRate": feat[i].cumDeaths28DaysByDeathDateRate																																									
							});
						}
						
					table.appendRows(tableData);
					nationalCount++
					
					if (nationalCount >= nationNames.length) {
						doneCallback();
						// console.log(nationNames.length, count, "complete")
					} else {
						console.log(nationNames.length, nationalCount)
					};
				});
			}} else if (table.tableInfo.id == 'lower_tier_local_authority') {
				var callCount = 0;
				for (var l = 0; l < ltlaNames.length; l++) {
					var endpoint = 
						'https://api.coronavirus.data.gov.uk/v1/data?' +
						'filters=areaType=ltla;areaName=' + ltlaNames[l] +
						'&structure=' +
						'{"newCases":"newCasesByPublishDate",' +
						'"areaType":"areaType",' +
						'"areaName":"areaName",' +
						'"areaCode":"areaCode",' +
						'"date":"date",'+
						'"hash":"hash",'+
						'"cumCasesBySpecimenDateRate":"cumCasesBySpecimenDateRate",' +
						'"cumCasesBySpecimenDate":"cumCasesBySpecimenDate",' +
						'"newCasesBySpecimenDate":"newCasesBySpecimenDate",' +
						'"newDeaths28DaysByPublishDate":"newDeaths28DaysByPublishDate",' +
						'"cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate",' +
						'"cumDeaths28DaysByPublishDateRate":"cumDeaths28DaysByPublishDateRate",' +
						'"newDeaths28DaysByDeathDate":"newDeaths28DaysByDeathDate",' +
						'"cumDeaths28DaysByDeathDate":"cumDeaths28DaysByDeathDate",' +
						'"cumDeaths28DaysByDeathDateRate":"cumDeaths28DaysByDeathDateRate"}'
					;
					$.getJSON(endpoint, function(resp) {
						var feat = resp.data,
							tableData = []
							
						for (var i = 0, len = feat.length; i < len; i++) {
							tableData.push({
								"date": feat[i].date,
								"newCases": feat[i].newCases, 
								"areaCode": feat[i].areaCode,
								"areaName": feat[i].areaName, 
								"areaType": feat[i].areaType, 
								"hash": feat[i].hash,
								"cumCasesBySpecimenDateRate": feat[i].cumCasesBySpecimenDateRate,
								"cumCasesBySpecimenDate": feat[i].cumCasesBySpecimenDate, 
								"newCasesBySpecimenDate": feat[i].newCasesBySpecimenDate,
								"newDeaths28DaysByPublishDate": feat[i].newDeaths28DaysByPublishDate,
								"newDeaths28DaysByDeathDate": feat[i].newDeaths28DaysByDeathDate,
								"cumDeaths28DaysByPublishDate": feat[i].cumDeaths28DaysByPublishDate,
								"cumDeaths28DaysByPublishDateRate": feat[i].cumDeaths28DaysByPublishDateRate,
								"cumDeaths28DaysByDeathDate": feat[i].cumDeaths28DaysByDeathDate,
								"cumDeaths28DaysByDeathDateRate": feat[i].cumDeaths28DaysByDeathDateRate																																							
							});
						}
						
					table.appendRows(tableData);
					callCount++
					
					if (callCount >= ltlaNames.length) {
						doneCallback();
					};
				});
			}} else if (table.tableInfo.id == 'upper_tier_local_authority') {
				var utlaCount = 0;
				for (var u = 0; u < utlaNames.length; u++) {
					var endpoint = 
					'https://api.coronavirus.data.gov.uk/v1/data?' +
					'filters=areaType=utla;areaName=' + utlaNames[u] +
					'&structure=' +
					'{"newCases":"newCasesByPublishDate",' +
					'"areaType":"areaType",' +
					'"areaName":"areaName",' +
					'"areaCode":"areaCode",' +
					'"date":"date",'+
					'"hash":"hash",'+
					'"cumCasesBySpecimenDateRate":"cumCasesBySpecimenDateRate",' +
					'"cumCasesBySpecimenDate":"cumCasesBySpecimenDate",' +
					'"newCasesBySpecimenDate":"newCasesBySpecimenDate",' +
					'"newDeaths28DaysByPublishDate":"newDeaths28DaysByPublishDate",' +
					'"cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate",' +
					'"cumDeaths28DaysByPublishDateRate":"cumDeaths28DaysByPublishDateRate",' +
					'"newDeaths28DaysByDeathDate":"newDeaths28DaysByDeathDate",' +
					'"cumDeaths28DaysByDeathDate":"cumDeaths28DaysByDeathDate",' +
					'"cumDeaths28DaysByDeathDateRate":"cumDeaths28DaysByDeathDateRate"}'
					;
					$.getJSON(endpoint, function(resp) {
						var feat = resp.data,
							tableData = []
							
						for (var i = 0, len = feat.length; i < len; i++) {
							tableData.push({
								"date": feat[i].date,
								"newCases": feat[i].newCases, 
								"areaCode": feat[i].areaCode,
								"areaName": feat[i].areaName, 
								"areaType": feat[i].areaType, 
								"hash": feat[i].hash,
								"cumCasesBySpecimenDateRate": feat[i].cumCasesBySpecimenDateRate,
								"cumCasesBySpecimenDate": feat[i].cumCasesBySpecimenDate, 
								"newCasesBySpecimenDate": feat[i].newCasesBySpecimenDate,
								"newDeaths28DaysByPublishDate": feat[i].newDeaths28DaysByPublishDate,
								"newDeaths28DaysByDeathDate": feat[i].newDeaths28DaysByDeathDate,
								"cumDeaths28DaysByPublishDate": feat[i].cumDeaths28DaysByPublishDate,
								"cumDeaths28DaysByPublishDateRate": feat[i].cumDeaths28DaysByPublishDateRate,
								"cumDeaths28DaysByDeathDate": feat[i].cumDeaths28DaysByDeathDate,
								"cumDeaths28DaysByDeathDateRate": feat[i].cumDeaths28DaysByDeathDateRate																																								
							});
						}
						
					table.appendRows(tableData);
					utlaCount++
					
					if (utlaCount >= utlaNames.length) {
						doneCallback();
						// console.log(nationNames.length, count, "complete")
					} else {
						console.log(utlaNames.length, utlaCount)
					};
				});
			}} 
			else if (table.tableInfo.id == 'regions') {
				var regionCount = 0;
				for (var r = 0; r < regionNames.length; r++) {
					var endpoint = 
						'https://api.coronavirus.data.gov.uk/v1/data?' +
						'filters=areaType=region;areaName=' + regionNames[r] +
						'&structure={"newCases":"newCasesByPublishDate","areaType":"areaType","areaName":"areaName","areaCode":"areaCode","date":"date","hash":"hash","cumCasesBySpecimenDateRate":"cumCasesBySpecimenDateRate","newCasesBySpecimenDate":"newCasesBySpecimenDate","cumCasesBySpecimenDateRate":"cumCasesBySpecimenDateRate","cumCasesBySpecimenDate":"cumCasesBySpecimenDate","maleCases":"maleCases","femaleCases":"femaleCases","newPillarOneTestsByPublishDate":"newPillarOneTestsByPublishDate","cumPillarOneTestsByPublishDate":"cumPillarOneTestsByPublishDate","newPillarTwoTestsByPublishDate":"newPillarTwoTestsByPublishDate","cumPillarTwoTestsByPublishDate":"cumPillarTwoTestsByPublishDate","newPillarThreeTestsByPublishDate":"newPillarThreeTestsByPublishDate","cumPillarThreeTestsByPublishDate":"cumPillarThreeTestsByPublishDate","newPillarFourTestsByPublishDate":"newPillarFourTestsByPublishDate","cumPillarFourTestsByPublishDate":"cumPillarFourTestsByPublishDate","newAdmissions":"newAdmissions","cumAdmissions":"cumAdmissions","cumAdmissionsByAge":"cumAdmissionsByAge","cumTestsByPublishDate":"cumTestsByPublishDate","newTestsByPublishDate":"newTestsByPublishDate","covidOccupiedMVBeds":"covidOccupiedMVBeds","hospitalCases":"hospitalCases","plannedCapacityByPublishDate":"plannedCapacityByPublishDate","newDeaths28DaysByPublishDate":"newDeaths28DaysByPublishDate","cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate","cumDeaths28DaysByPublishDateRate":"cumDeaths28DaysByPublishDateRate","newDeaths28DaysByDeathDate":"newDeaths28DaysByDeathDate","cumDeaths28DaysByDeathDate":"cumDeaths28DaysByDeathDate","cumDeaths28DaysByDeathDateRate":"cumDeaths28DaysByDeathDateRate"}'
					;
					$.getJSON(endpoint, function(resp) {
						var feat = resp.data,
							tableData = []
							
						for (var i = 0, len = feat.length; i < len; i++) {
							tableData.push({
								"date": feat[i].date,
								"newCases": feat[i].newCases, 
								"areaCode": feat[i].areaCode,
								"areaName": feat[i].areaName, 
								"areaType": feat[i].areaType, 
								"hash": feat[i].hash,
								"cumCasesBySpecimenDateRate": feat[i].cumCasesBySpecimenDateRate,
								"newCasesBySpecimenDate": feat[i].newCasesBySpecimenDate,
								"cumCasesBySpecimenDate": feat[i].cumCasesBySpecimenDate, 
								"female_0_to_4_value": parseNested(feat[i].femaleCases, 'age', 'value','0_to_4'),
								"female_5_to_9_value": parseNested(feat[i].femaleCases, 'age', 'value','5_to_9'),	
								"female_10_to_14_value": parseNested(feat[i].femaleCases, 'age', 'value','10_to_14'),	
								"female_15_to_19_value": parseNested(feat[i].femaleCases, 'age', 'value','15_to_19'),	
								"female_20_to_24_value": parseNested(feat[i].femaleCases, 'age', 'value','20_to_24'),	
								"female_25_to_29_value": parseNested(feat[i].femaleCases, 'age', 'value','25_to_29'),		
								"female_30_to_34_value": parseNested(feat[i].femaleCases, 'age', 'value','30_to_34'),	
								"female_35_to_39_value": parseNested(feat[i].femaleCases, 'age', 'value','35_to_39'),	
								"female_40_to_44_value": parseNested(feat[i].femaleCases, 'age', 'value','40_to_44'),	
								"female_45_to_49_value": parseNested(feat[i].femaleCases, 'age', 'value','45_to_49'),
								"female_50_to_54_value": parseNested(feat[i].femaleCases, 'age', 'value','50_to_54'),	
								"female_55_to_59_value": parseNested(feat[i].femaleCases, 'age', 'value','55_to_59'),
								"female_60_to_64_value": parseNested(feat[i].femaleCases, 'age', 'value','60_to_64'),	
								"female_65_to_69_value": parseNested(feat[i].femaleCases, 'age', 'value','65_to_69'),
								"female_70_to_74_value": parseNested(feat[i].femaleCases, 'age', 'value','70_to_74'),	
								"female_75_to_79_value": parseNested(feat[i].femaleCases, 'age', 'value','75_to_79'),
								"female_80_to_84_value": parseNested(feat[i].femaleCases, 'age', 'value','80_to_84'),	
								"female_85_to_89_value": parseNested(feat[i].femaleCases, 'age', 'value','85_to_89'),	
								"female_90plus_value": parseNested(feat[i].femaleCases, 'age', 'value','90+'),			
								"female_0_to_4_rate": parseNested(feat[i].femaleCases, 'age', 'rate','0_to_4'),
								"female_5_to_9_rate": parseNested(feat[i].femaleCases, 'age', 'rate','5_to_9'),	
								"female_10_to_14_rate": parseNested(feat[i].femaleCases, 'age', 'rate','10_to_14'),	
								"female_15_to_19_rate": parseNested(feat[i].femaleCases, 'age', 'rate','15_to_19'),	
								"female_20_to_24_rate": parseNested(feat[i].femaleCases, 'age', 'rate','20_to_24'),	
								"female_25_to_29_rate": parseNested(feat[i].femaleCases, 'age', 'rate','25_to_29'),		
								"female_30_to_34_rate": parseNested(feat[i].femaleCases, 'age', 'rate','30_to_34'),	
								"female_35_to_39_rate": parseNested(feat[i].femaleCases, 'age', 'rate','35_to_39'),	
								"female_40_to_44_rate": parseNested(feat[i].femaleCases, 'age', 'rate','40_to_44'),	
								"female_45_to_49_rate": parseNested(feat[i].femaleCases, 'age', 'rate','45_to_49'),
								"female_50_to_54_rate": parseNested(feat[i].femaleCases, 'age', 'rate','50_to_54'),	
								"female_55_to_59_rate": parseNested(feat[i].femaleCases, 'age', 'rate','55_to_59'),
								"female_60_to_64_rate": parseNested(feat[i].femaleCases, 'age', 'rate','60_to_64'),	
								"female_65_to_69_rate": parseNested(feat[i].femaleCases, 'age', 'rate','65_to_69'),
								"female_70_to_74_rate": parseNested(feat[i].femaleCases, 'age', 'rate','70_to_74'),	
								"female_75_to_79_rate": parseNested(feat[i].femaleCases, 'age', 'rate','75_to_79'),
								"female_80_to_84_rate": parseNested(feat[i].femaleCases, 'age', 'rate','80_to_84'),	
								"female_85_to_89_rate": parseNested(feat[i].femaleCases, 'age', 'rate','85_to_89'),	
								"female_90plus_rate": parseNested(feat[i].femaleCases, 'age', 'rate','90+'),																																																
								"male_0_to_4_value": parseNested(feat[i].maleCases, 'age', 'value','0_to_4'),
								"male_5_to_9_value": parseNested(feat[i].maleCases, 'age', 'value','5_to_9'),	
								"male_10_to_14_value": parseNested(feat[i].maleCases, 'age', 'value','10_to_14'),	
								"male_15_to_19_value": parseNested(feat[i].maleCases, 'age', 'value','15_to_19'),	
								"male_20_to_24_value": parseNested(feat[i].maleCases, 'age', 'value','20_to_24'),	
								"male_25_to_29_value": parseNested(feat[i].maleCases, 'age', 'value','25_to_29'),		
								"male_30_to_34_value": parseNested(feat[i].maleCases, 'age', 'value','30_to_34'),	
								"male_35_to_39_value": parseNested(feat[i].maleCases, 'age', 'value','35_to_39'),	
								"male_40_to_44_value": parseNested(feat[i].maleCases, 'age', 'value','40_to_44'),	
								"male_45_to_49_value": parseNested(feat[i].maleCases, 'age', 'value','45_to_49'),
								"male_50_to_54_value": parseNested(feat[i].maleCases, 'age', 'value','50_to_54'),	
								"male_55_to_59_value": parseNested(feat[i].maleCases, 'age', 'value','55_to_59'),
								"male_60_to_64_value": parseNested(feat[i].maleCases, 'age', 'value','60_to_64'),	
								"male_65_to_69_value": parseNested(feat[i].maleCases, 'age', 'value','65_to_69'),
								"male_70_to_74_value": parseNested(feat[i].maleCases, 'age', 'value','70_to_74'),	
								"male_75_to_79_value": parseNested(feat[i].maleCases, 'age', 'value','75_to_79'),
								"male_80_to_84_value": parseNested(feat[i].maleCases, 'age', 'value','80_to_84'),	
								"male_85_to_89_value": parseNested(feat[i].maleCases, 'age', 'value','85_to_89'),	
								"male_90plus_value": parseNested(feat[i].maleCases, 'age', 'value','90+'),			
								"male_0_to_4_rate": parseNested(feat[i].maleCases, 'age', 'rate','0_to_4'),
								"male_5_to_9_rate": parseNested(feat[i].maleCases, 'age', 'rate','5_to_9'),	
								"male_10_to_14_rate": parseNested(feat[i].maleCases, 'age', 'rate','10_to_14'),	
								"male_15_to_19_rate": parseNested(feat[i].maleCases, 'age', 'rate','15_to_19'),	
								"male_20_to_24_rate": parseNested(feat[i].maleCases, 'age', 'rate','20_to_24'),	
								"male_25_to_29_rate": parseNested(feat[i].maleCases, 'age', 'rate','25_to_29'),		
								"male_30_to_34_rate": parseNested(feat[i].maleCases, 'age', 'rate','30_to_34'),	
								"male_35_to_39_rate": parseNested(feat[i].maleCases, 'age', 'rate','35_to_39'),	
								"male_40_to_44_rate": parseNested(feat[i].maleCases, 'age', 'rate','40_to_44'),	
								"male_45_to_49_rate": parseNested(feat[i].maleCases, 'age', 'rate','45_to_49'),
								"male_50_to_54_rate": parseNested(feat[i].maleCases, 'age', 'rate','50_to_54'),	
								"male_55_to_59_rate": parseNested(feat[i].maleCases, 'age', 'rate','55_to_59'),
								"male_60_to_64_rate": parseNested(feat[i].maleCases, 'age', 'rate','60_to_64'),	
								"male_65_to_69_rate": parseNested(feat[i].maleCases, 'age', 'rate','65_to_69'),
								"male_70_to_74_rate": parseNested(feat[i].maleCases, 'age', 'rate','70_to_74'),	
								"male_75_to_79_rate": parseNested(feat[i].maleCases, 'age', 'rate','75_to_79'),
								"male_80_to_84_rate": parseNested(feat[i].maleCases, 'age', 'rate','80_to_84'),	
								"male_85_to_89_rate": parseNested(feat[i].maleCases, 'age', 'rate','85_to_89'),	
								"male_90plus_rate": parseNested(feat[i].maleCases, 'age', 'rate','90+'),
								"newPillarOneTestsByPublishDate": feat[i].newPillarOneTestsByPublishDate,	
								"cumPillarOneTestsByPublishDate": feat[i].cumPillarOneTestsByPublishDate,
								"newPillarTwoTestsByPublishDate": feat[i].newPillarTwoTestsByPublishDate,
								"cumPillarTwoTestsByPublishDate": feat[i].cumPillarTwoTestsByPublishDate, 
								"newPillarThreeTestsByPublishDate": feat[i].newPillarThreeTestsByPublishDate,
								"cumPillarThreeTestsByPublishDate": feat[i].cumPillarThreeTestsByPublishDate,
								"newPillarFourTestsByPublishDate": feat[i].newPillarFourTestsByPublishDate,
								"cumPillarFourTestsByPublishDate": feat[i].cumPillarFourTestsByPublishDate,
								"newAdmissions": feat[i].newAdmissions, 
								"cumAdmissions": feat[i].cumAdmissions,
								"cumAdmissionsByAge": feat[i].cumAdmissionsByAge, 
								"cumTestsByPublishDate": feat[i].cumTestsByPublishDate, 
								"newTestsByPublishDate": feat[i].newTestsByPublishDate,
								"covidOccupiedMVBeds": feat[i].covidOccupiedMVBeds,
								"hospitalCases": feat[i].hospitalCases,
								"plannedCapacityByPublishDate": feat[i].plannedCapacityByPublishDate, 
								"newDeaths28DaysByPublishDate": feat[i].newDeaths28DaysByPublishDate,
								"cumDeaths28DaysByPublishDate": feat[i].cumDeaths28DaysByPublishDate,
								"cumDeaths28DaysByPublishDateRate": feat[i].cumDeaths28DaysByPublishDateRate,	
								"newDeaths28DaysByDeathDate": feat[i].newDeaths28DaysByDeathDate,
								"cumDeaths28DaysByDeathDate": feat[i].cumDeaths28DaysByDeathDate,
								"cumDeaths28DaysByDeathDateRate": feat[i].cumDeaths28DaysByDeathDateRate																																									
							});
						}
						
					table.appendRows(tableData);
					regionCount++
					
					if (regionCount >= regionNames.length) {
						doneCallback();
					} else {
						console.log(regionCount.length, regionCount)
					};
				});
			}}
		})
}

// helper function to read local json file
function loadJSON(jsonFile, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', jsonFile, true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// .open will NOT return a value but simply returns undefined in async mode so use a callback
			callback(xobj.responseText);
		}
	}
	xobj.send(null);
}	

function parseNested(obj, outerKey, returnValue, searchTerm){
	for (i in obj) {
		if (i in obj){
			for (var o = 0; o < obj.length; o++) {
				if (obj[o][outerKey] === searchTerm){
					return obj[o][returnValue]
				}
			}
		}
	}
};	
tableau.registerConnector(myConnector);

$(document).ready(function () {
	$("#submitButton").click(function () {
		tableau.connectionName = "UK Coronavirus Figures";
		tableau.submit();
	});
});		
})();