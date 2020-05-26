define(['jquery', 'request', 'jsonEditor'], function($, REQUEST, JSONEDITOR) {

  $(document).on('click', '.btn-modal-sendpush', sendpushButton);

  function sendpushButton(e) {
    let $modal = $("#myModal");
    var appId = $modal.find("[name=appId]").val();
    var token = $modal.find("[name=token]").val();
    var production = $modal.find("[name=production]:checked").val();
    
    try {

      var notification = JSONEDITOR.getEditorJson();
      var json = {
        appId : appId,
        token : token,
        production : Number(production),
        notification : notification
      };

      REQUEST("/apns/sendpush", "POST", JSON.stringify(json),
        function(data) {
          alert(data);
        },
        function(error) {
          alert(error);
        }
      );
    } catch (error) {
      JSONEDITOR.errorValidateResult(error);
    }
  }

  return function() {
    this.jsonEditor = JSONEDITOR;
  };

});
