const fetch = require("node-fetch");
const fs = require('fs');

var users=["tourist", "Benq", "Petr", "Radewoosh", "ecnerwala", "maroonrk", "jiangly", "scott_wu", "ainta", "boboniu"]
var currentContestId=1480
var result=[]

async function fetchGet(i){
	result[i]={}
	var url="https://codeforces.com/api/user.rating?handle="+users[i]
	let response=await fetch(url)
	let data = await response.json();
	result[i]['handle']=users[i] 
	for(let j=0;j<data['result'].length;j++){
		var contestId=data['result'][j]['contestId']
		var newRating=data['result'][j]['newRating']
		result[i][contestId]=newRating
	}
}

for(var i=0, j=0;i<users.length;i++){
	setTimeout(()=>{
		fetchGet(j).then(()=>{
			if(!result[j][1])
				result[j][1]=0;
			for(var k=2;k<=currentContestId;k++){
				if(!result[j][k])
					result[j][k]=result[j][k-1];
			}
			if(j==users.length-1){
				const jsonString = JSON.stringify(result)
				fs.writeFile('./final.json', jsonString, err => {
				    if (err) {
				        console.log('Error writing file', err)
				    } else {
				        console.log('Successfully wrote file')
				    }
				})
			}
			console.log(users[j]," done")
			j++;
		})
	}, i*3000); 
}
