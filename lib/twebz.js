exports.init = function(dbname) {
  return {
    app_user : dbname,
    config_db : dbname + "-config",
    twitter_keys_docid : 'twitter-app-keys',
    secret_docid : "twebz-secret",
    profile_docid : function(twitter_user_id) {
      return dbname + "-twitter.user-" + twitter_user_id;
    },
    user_setup_docid : function(username) {
      return dbname + "-setup-" + username;
    },
    user_db : function(username) {
      return dbname + "-private-" + username;
    },
    randomToken : function() {
      return $.couch.newUUID().split("").sort(function() {
        return Math.random() - Math.random();
      }).join("");
    }
  }
};

exports.tweetli = function(doc) {
  var user = doc.user
    , linkup = require("vendor/couchapp/lib/linkup")
    , utils = require("vendor/couchapp/lib/utils")
    ;
  return {
    image_url : user.profile_image_url,
    name : user.screen_name,
    nickname : user.name || user.screen_name,
    message : linkup.encode(doc.text, "#/user/", "#/search/"),
    pretty_date : utils.prettyDate(doc.created_at),
    created_at : doc.created_at,
    _id : doc._id
  };
};