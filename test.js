/**
 * Created by anserliu on 2019/3/27.
 */
function createData(deep,breath){
	var data = {}
	var tmp = data

	for(var i = 0;i<deep;i++){
		tmp = tmp['data'] = {}
		for(var j = 0;j<breath;j++){
			tmp[j] = j
		}
	}
	return data
}

console.log(createData(5,4))