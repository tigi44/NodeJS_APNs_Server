define(['jsoneditor'], function(JSONEditor) {

  let container             = document.getElementById("jsoneditor");
  let spanValidateResultEl  = document.getElementById('span_validate_result');
  let jsonEditorMode        = ['code' /*, 'text'*/ , 'tree' /*, 'view'*/ /*, 'form'*/];
  let options               = {
                                modes : jsonEditorMode,
                                onError : onError,
                                onModeChange : onModeChange
                              };
  let editor                = new JSONEditor(container, options);

  insertValidateHTML();

  function insertValidateHTML() {
    let spanValidate = '<div style="margin-top: 10px;"><button id="btn-json-validate" class="btn btn-success float-right">VALIDATE JSON</button><span id="span_validate_result"></span></div>';
    container.insertAdjacentHTML('afterend',spanValidate);
    spanValidateResultEl  = document.getElementById('span_validate_result');

    let validateButton = document.getElementById("btn-json-validate");
    validateButton.addEventListener("click", function(e) {
      validateJsonButton(e);
    });
  }

  function onError(error) {
    errorValidateResult(error);
  }

  function onModeChange(newMode, oldMode) {
    jsonEditorExpandAll(newMode);
  }

  function jsonEditorExpandAll(mode) {
    if (mode == 'tree')
      editor.expandAll();
  }

  function validateJsonButton(e) {
    try {
      var json             = editor.get();
      var prettyJsonString = JSON.stringify(json, undefined, 4);

      editor.set(JSON.parse(prettyJsonString));
      jsonEditorExpandAll(editor.getMode());
      successValidateResult();
    } catch(error) {
      errorValidateResult(error);
    }
  }

  function successValidateResult() {
    spanValidateResultEl.style.color   = '#0a5';
    spanValidateResultEl.innerHTML     = 'Success Validation!';
  }

  let errorValidateResult = function(validateResult) {
    spanValidateResultEl.style.color   = '#f00';
    spanValidateResultEl.innerHTML     = validateResult;
  }

  let getEditorText = function() {
    return editor.getText();
  }

  let getEditorJson = function() {
    return editor.get();
  }

  let setEditorJson = function(text) {
    editor.set(text);
    jsonEditorExpandAll(editor.getMode());
    errorValidateResult('');
  }

  return {
    errorValidateResult : errorValidateResult,
    getEditorText : getEditorText,
    getEditorJson : getEditorJson,
    setEditorJson : setEditorJson
  };
});
