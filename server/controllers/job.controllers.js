var mongoose = require('mongoose');
var model = require('../models/job.model.js');
var keyword = require('../models/jobcategorydetail.model.js');
var workplace = require('../models/workplace.model.js');


//get lien ket bang


// Get all job -- incluce  : job and company
module.exports.getAllJob_company = function (req, res) {
  model.aggregate([
    {
      "$lookup": {
        "from": "recruiter",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "listuser"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};

module.exports.gettop12Company = function (req, res) {
  model.aggregate([
    { "$group": { _id: "$recruiterid", count: { $sum: 1 }, recruiterid: { $first: "$recruiterid" } } },
    { $project: { _id: 1, name: 1, count: 1, recruiterid: 1 } },
    { $lookup: { from: "recruiters", localField: "recruiterid", foreignField: "_id", as: "info" } },
    { $limit: 12 }
  ], function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  })
};

//job hien tai con thoi han
module.exports.count_job_in_Company = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { recruiterid: new ObjectId(req.params.id), endPost: { "$gte": new Date() } } },
    { "$group": { _id: "$recruiterid", count: { $sum: 1 }, recruiterid: { $first: "$recruiterid" } } },
    { $project: { _id: 1, count: 1, recruiterid: 1 } },
  ], function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  })
};



module.exports.getByIdDetailJob = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { _id: new ObjectId(req.params.id), endPost: { "$gte": new Date() }, status: true } },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};



module.exports.getByIdDetailJob_admin = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { _id: new ObjectId(req.params.id) } },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};



//==================Get top 10 job By ID RECRUTER=========



module.exports.jobincompany = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { recruiterid: new ObjectId(req.params.id), endPost: { "$gte": new Date() }, status: true } },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiters",
        "foreignField": "_id",
        "as": "recruiters"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "CategoryDetail"
      }
    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Category"
      }
    },

    { $limit: 10 }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};




//var _ = require('underscore');
//GET SKILL COMPANY
module.exports.get_All_Skill_Company = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate(
    [
      { $match: { recruiterid: new ObjectId(req.params.id) } },
      {
        "$group": {
          "_id": "$jobcategorydetail",
          "count": { "$sum": 1 }
        }
      },
      { $lookup: { from: "jobcategorydetail", localField: "jobcategorydetail", foreignField: "_id", as: "details" } },
    ],
    function (err, docs) {
      if (err) console.log(err);
      console.log(docs);
    }
  );

};



// Get
module.exports.searchJobTitles = function (req, res) {
  //get value from post  or
  var Ksalarybegin = req.body.salarybeginP;
  var Ksalaryend = req.body.salaryendP;
  var Kdistrictid = req.body.districtidP;
  var Kworkplaceid = req.body.workplaceidP;
  var KJobTime = req.body.JobTimeP;
  var Kjobcategory = req.body.jobcategoryP;
  var Kjobcategorydetail = req.body.jobcategorydetailP;
  var result = req.body.titleP;
  var dateBegin = req.body.dateBeginP;
  var dateEnd = req.body.dateEndP;
  var obj1 = [];
  var obj2 = [];
  var ObjectId = require('mongoose').Types.ObjectId;

  if (dateBegin !== "==") {
    obj2.push({
      "createddate": { "$gte": new Date(dateBegin) }//  <=
    })
  }
  if (dateEnd !== "==") {
    obj2.push({
      "createddate": { "$lte": new Date(dateEnd) }//  <=
    })

  }
  if (typeof Ksalarybegin !== 'undefined' && Ksalarybegin !== "==" && Ksalarybegin !== "0") {

    if (parseInt(Ksalarybegin) !== 0 && isNaN(Ksalarybegin) == false)
      obj2.push({
        salarybegin: {
          $gte: parseInt(Ksalarybegin),
        }
      })
  }
  if (typeof Ksalaryend !== 'undefined' && Ksalaryend !== "==" && Ksalaryend !== "0") {

    if (parseInt(Ksalaryend) !== 0 && isNaN(Ksalaryend) == false)
      obj2.push({
        salaryend: {
          $lt: parseInt(Ksalaryend),
        }
      })
  }

  if (typeof Kdistrictid !== 'undefined' && Kdistrictid !== "==") {
    console.log('Kdistrictid')
    obj2.push({
      districtid: new ObjectId(Kdistrictid)
    })
  }
  console.log(Kworkplaceid)
  if (typeof Kworkplaceid !== 'undefined' && Kworkplaceid !== "==") {
    console.log('Kworkplaceid')
    obj2.push({
      workplaceid: new ObjectId(Kworkplaceid)
    })
  }
  if (typeof KJobTime !== 'undefined' && KJobTime !== "==") {
    console.log('KJobTime')
    obj2.push({
      JobTime: KJobTime
    })
  }
  if (typeof Kjobcategory !== 'undefined' && Kjobcategory !== "==") {
    console.log('Kjobcategory')
    obj2.push({
      jobcategory: new ObjectId(Kjobcategory)
    })
  }
  if (typeof Kjobcategorydetail !== 'undefined') {
    console.log('Kjobcategorydetail')
    var arr = [];
    Kjobcategorydetail.forEach(function (value) {
      arr.push(new ObjectId(value))
    });
    if (arr.length != 0)
      obj2.push({
        jobcategorydetail: { $in: arr }
      })
  }
  console.log('KKKK' + result)
  if (result !== "==") {
    obj2.push(
      { "title": new RegExp(result) }
    )
  }
  dateNow = new Date()
  obj2.push({
    "endPost": { "$gte": dateNow }//  <=
    , "status": true    //1 -true : -1 false
  })


  console.log(obj2);

  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    {
      $match: {
        $and: obj2
      }
    },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });


};


module.exports.getAllpage = function (req, res) {
  var skippage = req.params.skip;
  var limitpage = req.params.limit;

  model.aggregate([
    { $skip: parseInt(skippage) },
    { $limit: parseInt(limitpage) },
    {
      $sort: {
        "status": -1//true
        , "createddate": 1
      }
    },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};
//=============================ADMIN SEARCH =======================
module.exports.adminsearchAllpage = function (req, res) {
  var skippage = req.params.skip;
  var limitpage = req.params.limit;
  var action = 0;
  if (parseInt(skippage) == 0 && parseInt(limitpage) == 0) {
    skippage = "0";
    limitpage = "10";
  }
  //title job - email- sort active - company
  var title = req.body.title;
  var email = req.body.email;
  var namecopany = req.body.namecopany;
  var state = req.body.state;
  console.log(state)
  obj_condition = [];
  var arr = [
    { $skip: parseInt(skippage) },
    { $limit: parseInt(limitpage) },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },

    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ];
  if (title !== "" && typeof title !== "undefined") {
    obj_condition.push(
      { "title": new RegExp(title) }
    );
    con2 =
      {
        $match: {
          $and: obj_condition
        }
      }
    arr.push(con2)
  }


  //======bat dau kiem tra add condition vao==============

  if (state !== "" && typeof state !== "undefined") {
    var con = {
      $sort: {
        "status": parseInt(state)//true
      }
    }
    arr.push(con)
  }
  model.aggregate(arr).exec(function (err, docs) {
    if (err) throw err;
    console.log(docs)
    res.json(docs);
  });
};
module.exports.admincountsearchAllpage = function (req, res) {
  var skippage = req.params.skip;
  var limitpage = req.params.limit;
  if (parseInt(skippage) == 0 && parseInt(limitpage) == 0) {
    skippage = "0";
    limitpage = "10";
  }
  var action = 0;
  var title = req.body.title;
  var email = req.body.email;
  var namecopany = req.body.namecopany;
  var state = req.body.state;
  obj_condition = [];
  var k = 0; //kiem tra xem co 1 trong 3 dieu kien search theo title email,namecompany hay ko
  var arr = [
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },

    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ];
  if (title !== "" && typeof title !== "undefined") {
    obj_condition.push(
      { "title": new RegExp(title) }
    );
    k = 1
  }

  //======bat dau kiem tra add condition vao==============
  if (k == 1) {
    con2 =
      {
        $match: {
            $and: obj_condition
        }
      }
    arr.push(con2)
  }
  if (state !== "" && typeof state !== "undefined") {
    console.log(state)
    var con = {
      $sort: {
        "status": parseInt(state)//1 true
      }
    }
    arr.push(con)
  }
  model.aggregate(arr).exec(function (err, docs) {
    if (err) throw err;
    console.log(docs.length)
 
    res.json(docs.length);
  });
};


//============================ADMIN SEARCH=====================






















// Get all
module.exports.getAll = function (req, res) {

  model.aggregate([

    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};
module.exports.get_job_key = function (req, res) {

  console.log(req.body);

  var array = [];
  array = req.body;
  model.find({ keywords: { $in: array } }).sort({ "createddate": 1 }
  ).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });

};





module.exports.top10post = function (req, res) {
  model.aggregate([
    { $match: { endPost: { "$gte": new Date() }, status: true } },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "inforCompany"
      }
    },
    { $limit: 10 }
  ]).sort({ "createddate": 1 }

    ).exec(function (err, docs) {
      if (err) throw err;
      res.json(docs);
    });
};
module.exports.getalljobs = function (req, res) {
  model.find().exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};

module.exports.getiduser = function (req, res) {

  model.find(
    {
      'recruiterid': req.params.id
    },
    function (err, model) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(model);
      }
    });
};
// Count all
module.exports.count = function (req, res) {
  model.count(function (err, count) {
    if (err) { return console.error(err); }
    res.json(count);
  });
};
// Insert
module.exports.insert = function (req, res) {
  const obj = new model(req.body);
  obj.save(function (err, item) {
    if (err) { return console.error(err); }
    res.status(200).json(item);
    //save user



  });
};

// Get by id
module.exports.get = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;

  model.aggregate([
    { $match: { _id: new ObjectId(req.params.id) } },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    }

  ]).exec(function (err, docs) {
    res.json(docs);
  });
};
module.exports.get_job_company = function (req, res) {
  model.find({ recruiterid: req.params.id }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};

// Update by id
module.exports.update = function (req, res) {
  model.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};

// Delete by id
module.exports.delete = function (req, res) {
  model.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
}

