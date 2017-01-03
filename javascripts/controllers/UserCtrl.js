"use strict";
app.controller("UserCtrl", function($scope, $rootScope, AuthFactory, UserFactory, StorageFactory, AnnotationFactory, HypothesisFactory){
	console.log($rootScope.user.userAvatar);
	let updatedUser = {};
	let userId;
	$scope.updateProfile = ()=>{
		AuthFactory.getUser().then( (user)=>{
			user.updateProfile({

			});
		});
	};
	$scope.test = {};
	// $scope.uploadFile = function(){
	// 	console.log("$scope.userImage", $scope.userImage);
	// };
	if ($scope.userImage){
		$scope.userImage.data = $scope.userImage.data.split(',')[1];
	}
	$scope.newAvatar = function() {
		
		$scope.userImage.data = $scope.userImage.data.split(',')[1];
		console.log($scope.userImage);
		StorageFactory.uploadImage($rootScope.user.uid, $scope.userImage).then( (result)=>{

			UserFactory.updateUserAvatar($rootScope.user.id, result).then( (updateUserResponse)=>{
				console.log("updateUserResponse", updateUserResponse.userAvatar);
				$rootScope.user.photoURL = updateUserResponse.photoURL;
			});
		});
    };

 	
 	$scope.myChartObject = {};
	$scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];

    $scope.myChartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: "Mushrooms"},
            {v: 3},
        ]},
        {c: $scope.onions},
        {c: [
            {v: "Olives"},
            {v: 31}
        ]},
        {c: [
            {v: "Zucchini"},
            {v: 1},
        ]},
        {c: [
            {v: "Pepperoni"},
            {v: 2},
        ]}
    ]};


 //    // $routeParams.chartType == BarChart or PieChart or ColumnChart...
 //    $scope.myChartObject.type = "LineChart";
 //    $scope.myChartObject.options = {
 //        'title': 'How Much Pizza I Ate Last Night'
 //    };
 	
	// $scope.myChartObject = {
	// 	"type": "LineChart",
 //  		"displayed": false,
 //  		"data": {
	//     "cols": [
	//       {
	//         "id": "day",
	//         "label": "Day",
	//         "type": "string",
	//         "p": {}
	//       },
	//       {
	//         "id": "user-id",
	//         "label": "{{user.username}} annotations",
	//         "type": "number",
	//         "p": {}
	//       },
	//       {
	//         "id": "hypothesis-id",
	//         "label": "All hypothesis annotations",
	//         "type": "number",
	//         "p": {}
	//       }
	//     ],
	//     "rows": [
	//       {
	//         "c": [
	//           {
	//             "v": "{{$scope.today}}"
	//           },
	//           {
	//             "v": 19,
	//             "f": "42 items"
	//           },
	//           {
	//             "v": 12,
	//             "f": "Ony 12 items"
	//           },
	//           {
	//             "v": 7,
	//             "f": "7 servers"
	//           },
	//           {
	//             "v": 4
	//           }
	//         ]
	//       },
	//       {
	//         "c": [
	//           {
	//             "v": "February"
	//           },
	//           {
	//             "v": 13
	//           },
	//           {
	//             "v": 1,
	//             "f": "1 unit (Out of stock this month)"
	//           },
	//           {
	//             "v": 12
	//           },
	//           {
	//             "v": 2
	//           }
	//         ]
	//       },
	//       {
	//         "c": [
	//           {
	//             "v": "March"
	//           },
	//           {
	//             "v": 24
	//           },
	//           {
	//             "v": 5
	//           },
	//           {
	//             "v": 11
	//           },
	//           {
	//             "v": 6
	//           }
	//         ]
	//       }
	//     ]
	//   },
	//   "options": {
	//     "title": "Sales per month",
	//     "isStacked": "true",
	//     "fill": 20,
	//     "displayExactValues": true,
	//     "vAxis": {
	//       "title": "Sales unit",
	//       "gridlines": {
	//         "count": 10
	//       }
	//     },
	//     "hAxis": {
	//       "title": "Date"
	//     }
	//   },
	//   "formatters": {}
	// };
});