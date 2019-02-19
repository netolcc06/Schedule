// counting words

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
