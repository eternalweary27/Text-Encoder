const lowercase_chars = "abcdefghijklmnopqrstuvwxyz";
const uppercase_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const punctuation = "!£$%^&*()-=_+{};:@?<>#"

class Encoder{
    constructor(){
        this.character_set = lowercase_chars.concat(uppercase_chars).concat(digits).concat(punctuation).split("");
    }

    encodeText(text){
        throw new Error("Abstract Method encodeText must be Overrided");
    }

    decodeText(text){
        throw new Error("Abstract Method decodeText must be Overrided");
    }

    isValidOutput(text){
        try{
            let decoded_text = this.decodeText(text);
            return true;
        }catch(err){
            return false;
        }
    }
}

class Caesar extends Encoder{
    constructor(key){
        super();
        this.key = key;
        this.shift_multiplier = 1;
    }

    isValidKey(input_key){
        return (this.character_set.includes(input_key));
    }

    encodeText(text){
        let encoded_text = "";
        for (let i = 0; i < text.length; i++){
            let curr_char = text.charAt(i);
            if (!this.character_set.includes(curr_char)){
                encoded_text += curr_char;
            }else{
                let curr_char_index = this.character_set.indexOf(curr_char);
                let shift = (this.character_set.indexOf(this.key)+1) * this.shift_multiplier;
                let new_index = (curr_char_index + shift) % this.character_set.length;
                let encoded_char = this.character_set[new_index];
                encoded_text += encoded_char;
            }
        }
        return encoded_text;
    }

    decodeText(text){
        this.shift_multiplier = -1;
        let decoded_text = this.encodeText(text);
        this.shift_multiplier = 1;
        return decoded_text;
    }

}

class Vigenere extends Encoder{
    constructor(key){
        super();
        this.key = key;
        this.shift_multiplier = 1;
        this.curr_index = 0;
    }

    isValidKey(input_key){
        for (let i = 0; i < input_key.length; i++){
            let curr_char = input_key.charAt(i);
            if (!this.character_set.includes(curr_char)){
                return false;
            }
        }
        return true;
    }

    encodeText(text){
        let encoded_text = "";
        for (let i = 0; i < text.length; i++){
            let curr_char = text.charAt(i);
            if (!this.character_set.includes(curr_char)){
                encoded_text += curr_char;
            }else{
                let curr_key_char = this.key[this.curr_index];
                let curr_key_shift = (this.character_set.indexOf(curr_key_char)+1) * this.shift_multiplier;
                let curr_char_index = this.character_set.indexOf(curr_char);
                let new_index = (curr_char_index + curr_key_shift) % this.character_set.length;
                let encoded_char = this.character_set[new_index];
                encoded_text += encoded_char;

                this.curr_index = (this.curr_index + 1) % this.key.length;

            }
        }
        this.curr_index = 0;
        return encoded_text;
    }

    decodeText(text){
        this.shift_multiplier = -1;
        let decoded_text = this.encodeText(text);
        this.shift_multiplier = 1;
        return decoded_text;
    }

}

class Binary extends Encoder{
    constructor(){
        super();
    }

    getEncodedStr(char){
        let num = char.charCodeAt(0);
        let binary_str = num.toString(2);
        return binary_str;
    }

    getChar(binary_str){
        let num = parseInt(binary_str,2);
        let char = String.fromCharCode(num);
        return char;
    }

    encodeText(text){
        let encoded_text = "";
        for (let i = 0; i < text.length; i++){
            let curr_char = text.charAt(i);
            let encoded_char = this.getEncodedStr(curr_char);
            encoded_text += encoded_char;

            if (i < text.length - 1){
                encoded_text += " ";
            }
        }
        return encoded_text;
    }

    decodeText(text){
        let chars_arr = text.split(" ");
        let decoded_text = "";
        chars_arr.forEach(binary_str => {
            let decoded_char = this.getChar(binary_str);
            decoded_text += decoded_char;
        });
        return decoded_text;
    }

}

class Hex extends Binary{
    constructor(){
        super();
    }

    getEncodedStr(char){
        let num = char.charCodeAt(0);
        let hex_str = num.toString(16);
        return hex_str;
    }

    getChar(hex_str){
        let num = parseInt(hex_str,16);
        let char = String.fromCharCode(num);
        return char;
    }
}
