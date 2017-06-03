app = {
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
          console.log(data[index]);

          //filling minified info array
          arr_miniRepoInfo[index] = {
            name: data[index]['name'],
            forks: data[index]['forks'],
            stars: data[index]['stargazers_count'],
            watchers: data[index]['watchers']
          }
      }
      app.renderRepo(arr_miniRepoInfo);

    });
  },
  renderRepo: function(arr_miniRepoInfo){
    var repoPrefix = "Dungeon.";
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

      var repo_name = arr_miniRepoInfo[index]['name'].replace(repoPrefix, "");
      var repo_forks = arr_miniRepoInfo[index]['forks'];
      var repo_stars = arr_miniRepoInfo[index]['stars'];
      var repo_watchers = arr_miniRepoInfo[index]['watchers'];

       $("#" + (renderedRowCount - 1)).append("<div class='three columns'>Name:" + repo_name + "<br/>Forks" + repo_forks + "<br/>Stars" + repo_stars + "<br/>Watchers" + repo_watchers + "</div>");

    }
  }
}
