var encodingSelector = document.getElementById("selectEncodingType");
var keyInputForm = document.getElementById("inputKey");
var inputTextArea = document.getElementById("inputTextArea");
var encodeButton = document.getElementById("encodeButton");
var decodeButton = document.getElementById("decodeButton");
var outputTextArea = document.getElementById("outputTextArea");

let encoder_obj = new Caesar(" ");

encodingSelector.addEventListener("change",function(){
    let selected_encoder = this.value;
    switch (selected_encoder){
        case "Caesar":
            keyInputForm.style.display = "inline";
            encoder_obj = new Caesar(" ");
            break;
        
        case "Vigenere":
            keyInputForm.style.display = "inline";
            encoder_obj = new Vigenere(" ");
            break;
        
        case "Binary":
            keyInputForm.style.display = "none";
            encoder_obj = new Binary();
            break;
        
        case "Hex":
            keyInputForm.style.display = "none";
            encoder_obj = new Hex();
            break;
        
        default:
            break;
    }
});


var checkValidKey = function(encoder_obj,input_key_value){
    let key_entered = !(input_key_value == null || input_key_value == "");
    if (!key_entered){
        alert("You need to enter an encryption key!");
        return false;
    }

    if (!encoder_obj.isValidKey(input_key_value)){
        alert("Invalid Key");
        return false;
    }

    return true;

}

var checkValidInputTxt = function(input_txt){
    let text_entered = !(input_txt == null || input_txt == "")
    if (!text_entered){
        alert("You need to enter input text!");
        return false;
    }
    return true;
}

var checkValidOutputTxt = function(encoder_obj,input_txt){
    let text_entered = !(input_txt == null || input_txt == "")
    if (!text_entered){
        alert("You need to enter input text!");
        return false;
    }
    return encoder_obj.isValidOutput(input_txt);
}


encodeButton.addEventListener("click",function(){
    let input_key_value = keyInputForm.value;
    if (encodingSelector.value == "Caesar" || encodingSelector.value == "Vigenere"){
        if (!checkValidKey(encoder_obj,input_key_value)){
            return
        }
        encoder_obj.key = input_key_value;
    }

    let input_txt = inputTextArea.value;
    if (!checkValidInputTxt(input_txt)){
        return;
    }
    let encoded_text = encoder_obj.encodeText(input_txt);
    outputTextArea.value = encoded_text;

});

decodeButton.addEventListener("click",function(){
    let input_key_value = keyInputForm.value;
    if (encodingSelector.value == "Caesar" || encodingSelector.value == "Vigenere"){
        if (!checkValidKey(encoder_obj,input_key_value)){
            return
        }
        encoder_obj.key = input_key_value;
    }
    let input_txt = outputTextArea.value;
    if (!checkValidOutputTxt(encoder_obj,input_txt)){
        alert("Invalid Input Text");
        return;
    }
    let decoded_text = encoder_obj.decodeText(input_txt);
    inputTextArea.value = decoded_text;
});