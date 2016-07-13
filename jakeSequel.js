function genericComparator(obj1,obj2,ops){
    if(ops == "="){
        return obj1==obj2;
    }else if(ops=="!=") 
    {
       return obj1 != obj2;    
    }else if (ops=="like"){
        return obj1.indexOf(obj2)>-1;
    }else if (ops=="!like"){
        return obj1.indexOf(obj2)<0;
    }else if (ops==">"){
        return obj1 > obj2;
    }
    else if (ops=="<"){
        return obj1 < obj2;
    }
    else if (ops==">="){
        return obj1>=obj2;
    }else if (ops=="<="){
        return obj1<=obj2;
    }else{
        return null;
    }
    
}
function genericSearchText(arrayObj,searchText,operator){
    var resultee = [];
   for(var i=0;i<arrayObj.length; i++){
       if(genericComparator(arrayObj[i],searchText,operator)){
           resultee.push(arrayObj[i]);
       }
   }
    return resultee;
}
function isInCollection(arrayObj,searchText){
    var returnBool = false;
     for(var i=0;i<arrayObj.length; i++){
       if(genericComparator(arrayObj[i],searchText,"=")){
           return true;
       }
   }
    return returnBool;
}
var queryAbleArray = function(arrayObj){
                    var result = arrayObj;
                    var orResult = [];
                    var andAlsoResult = [];
                    
                    this.JSONWhere = function(ops,column,val){
                         result = genericSearchJSON(arrayObj,column,val,ops);
                    },
                    this.JSONAnd = function(ops,column,val){
                         result = genericSearchJSON(result,column,val,ops);
                    },
                    this.JSONOr = function(ops,column,val){
                           orResult = genericSearchJSON(arrayObj,column,val,ops);
                            result = result.concat(orResult);
                            orResult = [];
                    },
                    this.linearWhere = function(ops,val){
                            result = genericSearchText(arrayObj,val,ops);
                    },
                    this.linearAnd = function(ops,val){
                            result = genericSearchText(result,val,ops);   
                     },
                    this.linearOR = function(ops,val){
                            orResult = genericSearchText(arrayObj,val,ops);  
                            result = result.concat(orResult);
                            orResult = [];
                    },
                     this.returnResult = function(){
                        //    alert('returning ' + result.length);
                            return result;
                    },
                    this.returnUnique = function(){
                        return scrapeOffDuplicates(result);
                    }
}
var genericSearchJSON = function(arrayObj,column,val,ops){
  var resultee = [];
   for(var i=0;i<arrayObj.length; i++){
       if(genericComparator(arrayObj[i][column],val,ops)){
           resultee.push(arrayObj[i]);
       }
   }
    return resultee;
}

var scrapeOffDuplicates=function(arrayObj){
    var resultee = [];
    for(var i=0;i<arrayObj.length;i++){
        if(!isInCollection(resultee,arrayObj[i])){
            resultee.push(arrayObj[i]);
        }
    }
    return resultee;
}

var $JQ = {
     collection : (function(arrObj){
              var arrayObject = new queryAbleArray(arrObj,this);
             
                  returnArray = function(){
                     return arrayObject.returnUnique();
                  },
                  andClause = function(arr1,arr2,arr3){
                      if((arr1 != undefined && arr1!="") && (arr2== undefined || arr2=="") && 
                         (arr3==undefined || arr3 ==""))
                      {
                          //where there's only one argument, this is an array of values.
                          //parameter is the searchee.
                          arrayObject.linearAnd("=",arr1);
                      }
                      else if((arr1 != undefined && arr1!="") && (arr2!=undefined && arr2 !="")&&(arr3==undefined || arr3 ==""))
                      {
                        //first parameter is operator
                        //second parameter is value
                        // this is an array
                        arrayObject.linearAnd(arr1,arr2);
                      }  
                       else if((arr1 != undefined && arr1!="") && (arr2!=undefined && arr2 !="") && (arr3!=undefined && arr3 !=""))
                      {
                        //first parameter is operator
                        //second parameter is column
                        //third parameter is val
                        //there are three this is a json array
                          arrayObject.JSONAnd(arr1,arr2,arr3);
                      }
                      return this;
                  },
                  whereClause = function(arr1,arr2,arr3){
                      //if there's 2 arguments first one is operator 2nd one is value
                      //if there are 3 arguments then it's an value pair,
                      //arr1 is column,arr2 is operator,arr3 is value
                      if((arr1 != undefined && arr1!="") && (arr2== undefined || arr2=="") && 
                         (arr3==undefined || arr3 ==""))
                      {
                          //where there's only one argument, this is an array of values.
                          //parameter is the searchee.
                          arrayObject.linearWhere("=",arr1);
                      }
                      else if((arr1 != undefined && arr1!="") && (arr2!=undefined && arr2 !="")&&(arr3==undefined || arr3 ==""))
                      {
                        //first parameter is operator
                        //second parameter is value
                        // this is an array
                        arrayObject.linearWhere(arr1,arr2);
                      }
                      else if((arr1 != undefined && arr1!="") && (arr2!=undefined && arr2 !="") && (arr3!=undefined && arr3 !=""))
                      {
                        //first parameter is operator
                        //second parameter is column
                        //third parameter is val
                        //there are three this is a json array
                          arrayObject.JSONWhere(arr1,arr2,arr3);
                      }
                      return this;
                  },
                  orStrict = function(arr1,arr2,arr3){
                       //if there's 2 arguments first one is operator 2nd one is value
                      //if there are 3 arguments then it's an value pair,
                      //arr1 is column,arr2 is operator,arr3 is value
                      //arr1 is column,arr2 is operator,arr3 is value
                      if((arr1 != undefined && arr1!="") && (arr2== undefined || arr2=="") && 
                         (arr3==undefined || arr3 ==""))
                      {
                          //where there's only one argument, this is an array of values.
                          //parameter is the searchee.
                          arrayObject.linearOR("=",arr1);
                      }
                      else if((arr1 != undefined && arr1!="") && (arr2!=undefined && arr2 !="")&&(arr3==undefined || arr3 ==""))
                      {
                        //first parameter is operator
                        //second parameter is value
                        // this is an array
                        arrayObject.linearOR(arr1,arr2);
                      }
                      else if((arr1 != undefined && arr1!="") && (arr2!=undefined && arr2 !="") && (arr3!=undefined && arr3 !=""))
                      {
                        //first parameter is operator
                        //second parameter is column
                        //third parameter is val
                        //there are three this is a json array
                          arrayObject.JSONOr(arr1,arr2,arr3);
                      }
                      return this;
                  }
                  return {WHERE: whereClause, AND :andClause,OR : orStrict, GetResults : returnArray}
            })
}
