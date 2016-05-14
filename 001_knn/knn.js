
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(subarray){
  this.points = this.points.concat(subarray);

};

KNN.prototype.predict = function(vectorArray){
  return vectorArray.map.bind(this, this.predictSingle);
};

KNN.prototype.predictSingle = function(vector){
  return this._majority(8,this._sorted(this._distances(vector, this.points)));
};

KNN.prototype._distance = function(vectorOne, vectorTwo){
  return euclideanNorm(vectorSub(vectorOne, vectorTwo));
};

KNN.prototype._distances = function(vector, trainingDataArr){
  var self = this;
  // console.log(trainingDataArr);
  if(!trainingDataArr) return;
  return trainingDataArr.map(function(data){
    var distance = self._distance(vector,data[0]);
    var classification = data[1];
    return [distance, classification];
  });
};

KNN.prototype._sorted = function(subArrays){
  return subArrays.sort(function(a,b){
    return a[0]-b[0];
  }).map(function(group){
    return group[1];
  }); 
};

KNN.prototype._majority = function(k, sortedOutput){
  var list = sortedOutput.slice(0,k).sort(function(a,b){return a-b;});

  var frequency = {};  // array of frequency.
  var max = 0;  // holds the max frequency.
  var result;   // holds the max frequency element.
  for(var v in list) {
        frequency[list[v]]=(frequency[list[v]] || 0)+1; // increment frequency.
        if(frequency[list[v]] > max) { // is this frequency > max so far ?
                max = frequency[list[v]];  // update max.
                result = list[v];          // update result.
        }
  }
  return result;
};

KNN.prototype.score = function(data) {
  return (data);
};

function euclideanNorm(arr){
    return Math.sqrt( arr.reduce(function(old, n){
      return old + n*n },0) );
};

function vectorSub(arrOne, arrTwo){
    return arrOne.map(function(_,index){return arrOne[index] - arrTwo[index]});
};

module.exports = KNN