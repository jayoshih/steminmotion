var lessons = require('../lessons.json');

exports.view = function(req, res){
	res.render('lessons', lessons);
};

exports.lesson = function(req, res){
	var ids = req.params.id.split("-");
	var lesson = getModel(ids[0], lessons["slices"], ids, 0, {"titles":[], "model":null});
	console.log(lesson.titles)
	var sliceName=(ids.length>1)? lesson.titles[0] : null;
	var topicName=(ids.length>2)? lesson.titles[1] : null;

	res.render('lesson', {
				'lesson': lesson.model,
				'isLeaf': ids.length ===3,
				'slice': sliceName,
				'topic': topicName,
				'slice-url':"/lessons/" + ids[0],
				'topic-url' :"/lessons/" + ids.slice(0,2).join("-")
			});
};

function getModel(id, list, ids, index, returnData){
	index++;

	for(var i=0; i < list.length; i++){
		if(id == list[i]["id"]){
			returnData.titles.push(list[i]["title"]);
			if(index === ids.length){
				return {"titles":returnData.titles, "model": list[i]};
			}else{
				return getModel(id + "-" + ids[index], list[i]["topics"], ids, index, returnData);
			}
		}
	}
}