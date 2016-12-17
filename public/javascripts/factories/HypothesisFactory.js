"use strict";
app.factory("HypothesisFactory", function($q, $http, HYPOTHESIS_TOKEN){
	var searchHypothesis = (userInput)=>{
		return $q((resolve,reject)=>{
			$http.get(`https://hypothes.is/api/${userInput}`, {
				headers: {
					'Authorization': 'Bearer ' +HYPOTHESIS_TOKEN.Authorization
				}
			})
			.success( (getHypothesisResponse)=>{
				console.log("getHypothesisResponse", getHypothesisResponse);
				let HypothesisSearchResults = [];
				Object.keys(getHypothesisResponse).forEach((key)=>{
					// getHypothesisResponse[key].id = key;
					HypothesisSearchResults.push(getHypothesisResponse[key]);
				});
				resolve(HypothesisSearchResults);
			})
			.error( (getHypothesisError)=>{
				reject(getHypothesisError);
			});
		});
	};
	var getHypothesisJson = (oneAnnotation)=>{
		return $q((resolve,reject)=>{
			$http.get(`https://hypothes.is/api/annotations/${oneAnnotation.id}`, {
				headers: {
					'Authorization': 'Bearer ' +HYPOTHESIS_TOKEN.Authorization,
					
				}
			})
			.success( (getHypothesisJSONResponse)=>{
				console.log("getHypothesisJSONResponse", getHypothesisJSONResponse);
				resolve(getHypothesisJSONResponse);
			})
			.error( (getHypothesisJSONError)=>{
				reject(getHypothesisJSONError);
			});
		});
	};
	return {searchHypothesis, getHypothesisJson};
});