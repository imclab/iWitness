(function(){

  // tweets are returned in descending order by id
  var id = 99999999;
  var time = new Date;

  window.makeTweet = function(params) {
    id -= 1;
    time = moment(time).subtract('minutes', 1);
    return _.extend(
      {"created_at":time.toString(),
       "from_user":"The__Juggernaut",
       "from_user_id":28875574,
       "from_user_id_str":"28875574",
       "from_user_name":"The__Juggernaut ™​",
       "geo":{"coordinates":[25.7779,-80.2022],"type":"Point"},
       "id": id,
       "id_str":id.toString(),
       "iso_language_code":"en",
       "metadata":{"result_type":"recent"},
       "profile_image_url":"http://a1.twimg.com/profile_images/1790181970/407997_10101065265566198_13722024_64095789_801952831_n_normal.jpeg",
       "profile_image_url_https":"https://si0.twimg.com/profile_images/1790181970/407997_10101065265566198_13722024_64095789_801952831_n_normal.jpeg",
       "source":"&lt;a href=&quot;http://twitter.com/#!/download/ipad&quot; rel=&quot;nofollow&quot;&gt;Twitter for iPad&lt;/a&gt;",
       "text":"@bsmithavery hey hey",
       "to_user":"bsmithavery",
       "to_user_id":63798953,
       "to_user_id_str":"63798953",
       "to_user_name":"Brandon Avery Smith",
       "in_reply_to_status_id":166873002590478340,
       "in_reply_to_status_id_str":"166873002590478336"},
      params);
  };

  window.makeTweets = function (num, params){
    var a = [];
    params = params || {};
    var  tweet = makeTweet(params);
    _.times(num, function(){ a.push(tweet) });
    return a;
  };

  window.spyOnTwitterCall = function(name){
    var spy = spyOn($, 'getJSON');
    spy.andCallFake(function(url, params, callback) {
      if (url.match(/twitter/)) {
        params.targetUrl   = url;
        params.fixtureName = name;
        url                = '/mocks/twitter';
      }

      spy.originalValue.apply(this, [url, params, callback]);
    });
    return spy;
  }

})();
