var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category= mongoose.Schema({
	name:String,
	path:{type:String, index:true},
	count:Number,
	facets:{type:[String]}
});
module.exports = mongoose.model('categories', Category);
var Item = mongoose.Schema({
	title: String,
	master:{
		name: String,
		id: Schema.Types.ObjectId
	},
	shop:{
		name: String,
		id: Schema.Types.ObjectId,
	},
	desc: String,
	photos_ids:{ type: [Schema.Types.ObjectId], index: true },
	thumb:{ type: [Schema.Types.ObjectId], index: true },
	tags: { type: [String], index: true },
	pricing:{
		list: Number,
		retail: Number,
		savings: Number,
		pct_savings: Number
	}, 
	shipping:{
              weight: Number,
              dimensions:
              {
                    width: Number, 
                    height: Number,
                    depth: Number
               }
	},
	quant: Number, 
	details: [Schema.Types.Mixed],
	cat:{type:[Schema.Types.ObjectId], ref:'categories', index:true},
	meta:{
		views: Number,
		favs: Number,
		rating:Number
	},
	likes:[{
		by:{
			type: Schema.Types.ObjectId,
			ref:'users',
		},
		ts: Date
	}],
	reviews:[{
		by: { 
			type: Schema.Types.ObjectId,
			ref:'users' 
		},
		ts: Date,
		text: String }],
	c_date: { type: Date, default: Date.now },
	m_date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('items', Item);