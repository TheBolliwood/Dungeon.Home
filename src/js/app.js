app = {
  repoURI:"https://github.com/DungeonChat/",
  repoPrefix:"Dungeon.",

  init: function () {
    var str_username = "DungeonChat";
    app.getRepos(str_username);
  },
  getObjSize: function(obj){
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  },
  isDevideable: function(num){
    if(num % 3 == 0){
      return true;
    } else {
      return false;
    }
  },
  getRepos: function(str_username){

    var arr_miniRepoInfo = {};

    $.getJSON( "https://api.github.com/users/" + str_username + "/repos", function( data ) {

      for (index = 0; index < data.length; ++index) {

          if(data[index]['name'].indexOf(app.repoPrefix) !== -1){
            //filling minified info array
            arr_miniRepoInfo[index] = {
              name: data[index]['name'],
              forks: data[index]['forks'],
              stars: data[index]['stargazers_count'],
              watchers: data[index]['watchers'],
              uri: data[index]['html_url']
            }
          }
      }

      app.renderRepo(arr_miniRepoInfo);

    });
  },
  renderRepo: function(arr_miniRepoInfo){
    var rowCount = Math.round(app.getObjSize(arr_miniRepoInfo) / 3);
    console.log(rowCount);

    var renderedItemCount = 0;
    var renderedRowCount = 0;

    for (index = 0; index < app.getObjSize(arr_miniRepoInfo); ++index) {
      renderedItemCount = index;

      if(app.isDevideable(renderedItemCount)){
        $(".repo_container").append('<div class="row" id="'+renderedRowCount+'">');
        ++renderedRowCount
      }

      var repo_name = arr_miniRepoInfo[index]['name'].replace(app.repoPrefix, "");
      var repo_forks = arr_miniRepoInfo[index]['forks'];
      var repo_stars = arr_miniRepoInfo[index]['stars'];
      var repo_watchers = arr_miniRepoInfo[index]['watchers'];
      var repo_uri = arr_miniRepoInfo[index]['uri']

       $("#" + (renderedRowCount - 1)).append('<div class="four columns repo_item"><h3>' + repo_name + '</h3>Forks' + repo_forks + '<br/>Stars' + repo_stars + '<br/>Watchers' + repo_watchers + '<a href="' + repo_uri + '" target="_blank">Visit<i class="ion-android-open"></i></a></div>');

    }

  }
}
