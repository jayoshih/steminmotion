var lessons = require('../development.json');

exports.view = function(req, res){
	res.render('development');
};

exports.lessons = function(req, res){
	res.render('lessons', lessons);
};

exports.lesson = function(req, res){
	var ids = req.params.id.split("-");
	var lesson = getModel(ids[0], lessons["slices"], ids, 0);
	res.render('lesson', {
				'lesson': lesson,
				'isLeaf': ids.length === 3,
				'slice-url':"/lessons/" + ids[0],
				'topic-url' :"/lessons/" + ids.slice(0,2).join("-")
			});
};

function getModel(id, list, ids, index){
	index++;
	for(var i=0; i < list.length; i++){
		if(id == list[i]["id"]){
			if(index === ids.length){
				return list[i];
			}else{
				return getModel(id + "-" + ids[index], list[i]["topics"], ids, index);
			}
		}
	}
}