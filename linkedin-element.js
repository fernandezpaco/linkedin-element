(function() {
  'use strict';
  Polymer({
    is: 'linkedin-element',
    properties: {
        /**
        * For oauth acess token
        */
        access_token: {
            type: String,
            observer: '_tokenChange'
        },
        user_data: {
            type: Object,
            notify: true
        }
    },

    onError: function(event,data){
        this.fire('relogin');
    },

    _tokenChange: function(){
        this.$.ajax.url="https://api.linkedin.com/v1/people/~:(id,first-name,num-connections,picture-url,email-address)";
        this.$.ajax.params={'oauth2_access_token':this.access_token,'format':'json'};
        this.$.ajax.generateRequest();
    },
    share: function(comment){
        this.$.ajax2.method="POST";
        this.$.ajax2.params={};
        this.$.ajax2.url="https://api.linkedin.com/v1/people/~/shares";
        var bearer='Bearer '+this.access_token;
        this.$.ajax2.headers={'content-type':'application/json','x-li-format':'json'};
        this.$.ajax2.params={'format':'json','oauth2_access_token':this.access_token};
        //var comment="Check this course! "+this.uri;
        this.$.ajax2.body=JSON.stringify({"comment": comment, "visibility": {"code": "anyone"}});
        this.$.ajax2.generateRequest();
    },
    onResponse: function(event,data){
        var me=this;
        data.completes.then(function(response){
            console.log(response.__data__.response);    
            var data={};
            data.avatar={};
            data.avatar.url=response.__data__.response.pictureUrl;
            data.firstName=response.__data__.response.firstName;
            data.email=response.__data__.response.emailAddress;
            me.fire('user_data',data);
            me.set('user_data',data);
        });
        
    }
  });
}());