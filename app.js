var fs=require("fs")



let data_storage_obj={
    'init':(fileName)=>StorageManager(data_storage_obj,fileName),
    'words':[]
}
let stop_word_obj={
    'stop_word':[],
    'init': () => StopWordsManager(stop_word_obj),
    'is_stop_word':(word)=>is_stop_word(stop_word_obj,word)
}
let word_freq_obj={
    'freq':[],
    'increment_count':(word)=>increment_count(word_freq_obj,word),
    'sorted':()=>sorted(word_freq_obj['freq'])
}


function StorageManager(data_storage_obj,fileName){
    
 return   data_storage_obj["words"] = fs.readFileSync(fileName).toString().split(" ");

}
function StopWordsManager(stop_word_obj){
    return stop_word_obj["stop_word"] = fs.readFileSync("stopwords.txt").toString().split(",");
    
}
function is_stop_word(stop_word_obj,word){

    return stop_word_obj['stop_word'].includes(word)
}
function  increment_count(word_freq_obj,word){
       
        if(word_freq_obj['freq'].find(x => x.key === word)){
            word_freq_obj['freq'].find(x => x.key === word).count++
        }else{
        word_freq_obj['freq'].push({key:word,count:1})
        }
}
function sorted(freq){
    return freq.sort((a,b) =>  b.count - a.count)
}
let words = data_storage_obj['init']("story.txt");
stop_word_obj['init']()

for(let item of words){
    
   if(!stop_word_obj['is_stop_word'](item)){
    word_freq_obj['increment_count'](item)
   }
   
}

console.log(word_freq_obj['sorted']())

//console.log(data_storage_obj['init']("story.txt"))

// class StopWordsManager{
//     constructor(){
//         this.data =  fs.readFileSync('stopwords.txt').toString().split(",");
//         this.wordAfterRemoveStopWords =[]
//     }
//     isStopWord(word){
        
//         if(!this.data.includes(word)){
//             this.wordAfterRemoveStopWords.push(word)
//         } 
//         return this.wordAfterRemoveStopWords;

//     }
// }
// class WordFreqManager{
//     constructor(){
//         this.storyAfterFreq=[]
//     }
//     incrementCount(word){
       
//         if(this.storyAfterFreq.find(x => x.key === word)){
//             this.storyAfterFreq.find(x => x.key === word).count++
//         }else{
//             this.storyAfterFreq.push({key:word,count:1})
//         }
//     }
//     sort(){
//       return  this.storyAfterFreq.sort((a,b) =>  b.count - a.count)
//     }
    
// }

// class WordFrequencyController{
//     constructor(fileName){
//         this._storageManager = new StorageManager(fileName)
//         this._stopWordsManager = new StopWordsManager()
//         this._wordFreqManager = new WordFreqManager()
//     }
//     run(){
//         let words = this._storageManager.word();
//         for(let i in words){
//             if(this._stopWordsManager.isStopWord(words[i]===undefined)){
//                 this._wordFreqManager.incrementCount(words[i]);
//             }
//         }
//         console.log(this._wordFreqManager.sort())
       
//     }
// }
// let WFC = new WordFrequencyController("story.txt");
// WFC.run();
