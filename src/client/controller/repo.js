module.controller('RepoCtrl', ['$scope', '$stateParams', '$HUB', '$RPC', 'repo', function($scope, $stateParams, $HUB, $RPC, repo) {

	// get the repo
	$scope.repo = repo;

	// get the branches
	$scope.branches = $HUB.call('repos', 'getBranches', {
		user:$stateParams.user, 
		repo:$stateParams.repo
	});

	// get the commits
	$scope.commits = $HUB.call('repos', 'getCommits', {
		user:$stateParams.user, 
		repo:$stateParams.repo
	});

	// get the pull requests

	$scope.openPulls = $HUB.call('pullRequests', 'getAll', {
		user:$stateParams.user, 
		repo:$stateParams.repo,
		state: 'open'
	}, function() {
		$scope.closedPulls = $HUB.call('pullRequests', 'getAll', {
			user:$stateParams.user, 
			repo:$stateParams.repo,
			state: 'closed'
		}, function() {
			var open = $scope.openPulls.value || [];
			var closed = $scope.closedPulls.value || [];

			$scope.pulls = open.concat(closed);

			console.log($scope.pulls);
		})
	});

}]);
