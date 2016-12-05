"use strict";
app.factory("HypothesisFactory", function($q, $http, HYPOTHESIS_KEY){
	var getHypothesis = ()=>{
		return $q((resolve,reject)=>{
			$http.get(`https://hypothes.is/api/`, {
				headers: {
					'Authorization': `${HYPOTHESIS_KEY}`
				}
			})
			.success( (getHypothesisResponse)=>{
				console.log("getHypothesisResponse", getHypothesisResponse);
				resolve(getHypothesisResponse);
			})
			.error( (getHypothesisError)=>{
				reject(getHypothesisError);
			});
		});
	};
	return {getHypothesis};
});