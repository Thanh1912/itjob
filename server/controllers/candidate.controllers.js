var mongoose = require('mongoose');
var model = require('../models/candidate.model.js')
  , passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken'), config = require('../config/config');

// user register
module.exports.register = function (req, res, next) {
  var user = new model({
    fullname: req.body.fullname,
    email: req.body.email,
    profileimage: "anonymous.png",
    password: passwordHash.generate(req.body.password)
  });

  console.log(user)
  user.save(function (err, result) {
    if (err) {
      console.log(err)
      console.log(result)
      return res.status(403).json({
        title: 'There was an issue',
        error: { message: 'The email you entered already exists' }
      });
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
};
// user login
module.exports.login = function (req, res, next) {
  console.log('dang login' + req.body.email)
  model.findOne({ email: req.body.email }, function (err, doc) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!doc) {
      return res.status(403).json({
        title: 'Wrong Email or Password',
        error: { message: 'Please check if your password or email are correct' }
      })
    }
    if (!passwordHash.verify(req.body.password, doc.password)) {
      return res.status(403).json({
        title: 'You cannot log in',
        error: { message: 'Please check your password or email' }
      })
    }
    var token = jwt.sign({ user: doc }, config.secret, { expiresIn: config.jwtExpire });
    return res.status(200).json({
      message: 'Login Successfull',
      token: token,
      userId: doc._id,
      username: doc.email,
      role: doc.role,
      fullname: doc.fullname,
    })
  })
};
// Get all
module.exports.getAllpage = function (req, res) {
  var skippage = req.params.skip;
  var limitpage = req.params.limit;
  model.aggregate([
    { $skip: parseInt(skippage) },
    { $limit: parseInt(limitpage) },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "jobcategories_view"
      }
    },
    {
      "$lookup": {
        "from": "diplomalanguages",
        "localField": "diplomalanguage",
        "foreignField": "_id",
        "as": "diplomalanguage_view"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "workplaceid_view"
      }
    },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "districtid_view"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "jobcategorydetail_view"
      }
    },
    { $limit: 10 },

  ]).exec(function (err, docs) {
    res.json(docs);
  });





};


// Get all
module.exports.getAll = function (req, res) {
  model.find(
    function (err, model) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log('getall', model);
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




// Get by id
module.exports.topcandidate = function (req, res) {
  model.aggregate([

    { $match: { status: true } },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "jobcategories_view"
      }
    },
    {
      "$lookup": {
        "from": "diplomalanguages",
        "localField": "diplomalanguage",
        "foreignField": "_id",
        "as": "diplomalanguage_view"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "workplaceid_view"
      }
    },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "districtid_view"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "jobcategorydetail_view"
      }
    },
    { $limit: 10 },
  ]).exec(function (err, docs) {
    res.json(docs);
  });
};


// Insert
module.exports.insert = function (req, res) {
  const obj = new model(req.body);
  obj.save(function (err, item) {
    if (err) { return console.error(err); }
    res.status(200).json(item);
  });
};

// Get by id
module.exports.get = function (req, res) {
  model.findOne({ _id: req.params.id }, function (err, obj) {
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

// Update by id
module.exports.updateImagepro = function (req, res) {
  update = {
    profileimage: req.body.img
  }
  model.findOneAndUpdate({ _id: req.params.id }, update, function (err) {
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
//====================Search candidate============================
// Get 
module.exports.searchCandidate = function (req, res) {
  //get value from post  or 

  var Ksalary = req.body.salaryP;



  var Kdistrictid = req.body.districtidP;
  var Kworkplaceid = req.body.workplaceidP;
  var Kjobcategory = req.body.jobcategoryP;
  var Kjobcategorydetail = req.body.jobcategorydetailP;
  var Ktitle = req.body.titleP;
  var Kexperience = req.body.experienceP;
  var obj2 = [];
  var ObjectId = require('mongoose').Types.ObjectId;





  if (typeof Ksalary !== 'undefined' && Ksalary !== "==" && Ksalary !== "" && Ksalary !== "0") {


    console.log(Ksalary)
    var arr2 = Ksalary.split("-").map(function (val) {
      return Number(val);
    });
    console.log(arr2);
    var k = 0;
    arr2.forEach(function (value) {
      console.log('XUAT'+ 1);
      console.log(value);
      if (k == 0) {
        obj2.push({
          salary: {
            $gte: Number(value),
          }
        })
      } else {
        obj2.push({
          salary: {
            $lte: Number(value),
          }
        })
      }
      k++;
    });

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

  Kdiplomalanguage = req.body.diplomalanguageP;
  console.log(typeof Kdiplomalanguage)
  if (typeof Kdiplomalanguage !== 'undefined') {
    console.log('diplomalanguage')
    var arr = [];
    Kdiplomalanguage.forEach(function (value) {
      arr.push(new ObjectId(value))
    });
    if (arr.length != 0)
      obj2.push({
        diplomalanguage: { $in: arr }
      })
  }

  if (Ktitle !== "==" && Ktitle !== undefined) {
    obj2.push(
      { "nameprofile": new RegExp(Ktitle) }
    )
  }
  if (Kexperience !== "==" && Kexperience !== undefined) {
    obj2.push(
      { "experience": Kexperience }
    )
  }
  obj2.push(
    { "status": true }
  )

  console.log(obj2)
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
        "from": "diplomalanguages",
        "localField": "diplomalanguage",
        "foreignField": "_id",
        "as": "diploma_language"
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
//===========================Tìm Người Theo jobcatalog, keyword-skills========
module.exports.candidate_suitable = function (req, res) {


  var ObjectId = require('mongoose').Types.ObjectId;
  //mucluong-tinhthanh-quan-moicapnhat
  var Kjobcategory = req.body.jobcategory;
  var Ksalarybegin = req.body.salarybegin;// 



  var Ksalaryend = req.body.salaryend;// 
  var Kjobcategorydetail = req.body.jobcategorydetail;//jobcategorydetail -jobcategory
  var Kdistrictid = req.body.districtid;
  var Kworkplaceid = req.body.workplaceid;
  var obj2 = []  //array dieu kien and select document

  if (typeof Ksalarybegin !== 'undefined' && Ksalarybegin !== "==" && Ksalarybegin !== "" && Ksalarybegin !== "0") {

    if (parseInt(Ksalarybegin) !== 0 && isNaN(Ksalarybegin) == false)
      obj2.push({
        salary: {
          $gte: parseInt(Ksalarybegin),
        }
      })
  }


  if (typeof Ksalaryend !== 'undefined' && Ksalarybegin !== "==" && Ksalaryend !== "" && Ksalaryend !== "0") {
    if (parseInt(Ksalaryend) !== 0 && isNaN(Ksalaryend) == false)
      obj2.push({
        salary: {
          $lte: parseInt(Ksalaryend),
        }
      })
  }



  if (typeof Kdistrictid !== 'undefined' && Kdistrictid !== "==" && Kdistrictid !== "" && Kdistrictid !== "0") {
    obj2.push({
      districtid: new ObjectId(Kdistrictid)
    })
  }
  if (typeof Kworkplaceid !== 'undefined' && Kworkplaceid !== "==" && Kworkplaceid !== "" && Kworkplaceid !== "0") {
    obj2.push({
      workplaceid: new ObjectId(Kworkplaceid)
    })
  }

  if (typeof Ksalary !== 'undefined' && Ksalary !== "==" && Ksalary !== "" && Ksalary !== "0") {

    if (parseInt(Ksalary) !== 0 && isNaN(Ksalary) == false)
      obj2.push({
        salarybegin: {
          $gte: parseInt(Ksalary),
        }
      })
  }


  if (typeof Kjobcategory !== 'undefined' && Kjobcategory !== "==" && Kjobcategory !== "") {
    console.log('Kjobcategory')
    obj2.push({
      jobcategory: new ObjectId(Kjobcategory)
    })
  }
  if (typeof Kjobcategorydetail !== 'undefined' && Kjobcategorydetail !== "==" && Kjobcategorydetail !== "") {
    var arr = [];
    Kjobcategorydetail.forEach(function (value) {
      arr.push(new ObjectId(value));
      console.log(value + "==sdfsa")
    });

    if (arr.length != 0)
      obj2.push({
        jobcategorydetail: { $in: arr }
      })
  }

  obj2.push(
    { "status": true, }
  )

  console.log(obj2)
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    {
      $match: {
        $or: obj2
      }
    },
    {
      $sort: {
        "createddate": 1 //cap nhat moi nhat ho so cua ung vien
      }
    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "jobcategories_view"
      }
    },
    {
      "$lookup": {
        "from": "diplomalanguages",
        "localField": "diplomalanguage",
        "foreignField": "_id",
        "as": "diplomalanguage_view"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "workplaceid_view"
      }
    },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "districtid_view"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "jobcategorydetail_view"
      }
    },
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });


};



// Get all
module.exports.detail_Candidate = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([

    { $match: { _id: new ObjectId(req.params.id) } },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "jobcategories_view"
      }
    },
    {
      "$lookup": {
        "from": "diplomalanguages",
        "localField": "diplomalanguage",
        "foreignField": "_id",
        "as": "diplomalanguage_view"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "workplaceid_view"
      }
    },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "districtid_view"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "jobcategorydetail_view"
      }
    },
    { $limit: 1 },

  ]).exec(function (err, docs) {
    res.json(docs);
  });





};

