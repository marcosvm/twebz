function(resp) {
  var data = {
    twitter_accounts : []
  };
  for (var i=0; i < resp.rows.length; i++) {
    data.twitter_accounts.push({name:resp.rows[i].value.access_params.screen_name});
  };
  return data;
};