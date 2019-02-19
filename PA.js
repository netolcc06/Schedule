str = "meu nome é josé, seu nome! é ninguém, ninguém é perfeito?";

words = str.replace(/[abc+\,||\!||\?]/g, "").split(" ");

console.log(words);

map = {};

words.forEach(function(key){
    if(map.hasOwnProperty(key)){
        map[key]++;
    }
    else{
        map[key]= 1;
    }
}
);

console.log(map);

m = new Map();

/*m.forEach(function(value, key){
    console.log(key + ' ' + value)
});*/

//C style
for(var i = 0; i< words.length; i++){
    if(m.hasOwnProperty(words[i])){
        m[words[i]]++;
    }
    else{
        m[words[i]]= 1;
    }
}

console.log(m);
