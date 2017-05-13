app.run((FIREBASE_CONFIG) => {
	firebase.initializeApp(FIREBASE_CONFIG); 
});

app.controller("ShroomCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
	$scope.something = "Something";
	$scope.shrooms = "Placeholder";


let getShroomList = () => {
	let shrooms = [];
	return $q((resolve, reject) => {
		$http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
			.then((fbItems) => {
				var shroomCollection = fbItems.data;
     			Object.keys(shroomCollection).forEach((key) => {
        		shroomCollection[key].id = key;
       			shrooms.push(shroomCollection[key]);
      	});
      	resolve(shrooms);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

let getShrooms = () => {
	getShroomList().then((shrooms) => {
		console.log("in get shrooms");
		$scope.shrooms = shrooms;
	}).catch((error) => {
		console.log("get error", error);
	});
};

getShrooms();


});