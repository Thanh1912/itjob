var express = require('express');
var router = express.Router(),
  path = require('path'),
fs = require('fs');
var multer = require('multer');
var router = express.Router();

var cadidatectrl = require('../controllers/candidate.controllers.js');
/*==============================
      =======..........====
==============================
*/
router.post('/upload', function (req, res) {

    // create an incoming form object
    var form = new formidable.IncomingForm();
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});
/*==============================
      =======Upload cach 2====
==============================
*/
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/forms/post");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({
    storage: Storage
}).single('file');
router.post("/api/uploadpostbaidang", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        console.log(req.file.filename)
        return res.end(req.file.filename);
    });
});
//....
/*==============================
      =======Upload logo====
==============================
*/
var Storage_logo = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/forms/logo");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload_logo = multer({
    storage: Storage_logo
}).single('file_logo');
router.post("/api/uploadlogo", function (req, res) {
    upload_logo(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        console.log(req.file.filename)
        return res.end(req.file.filename);
    });
});
//UploadANH DAI DIEN CONG TY
var Storage_cogty = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/forms/image");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload_cogty = multer({
    storage: Storage_cogty
}).single('file_co');
router.post("/api/uploadcogty", function (req, res) {
    upload_cogty(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        console.log(req.file.filename)
        return res.end(req.file.filename);
    });
});
/*==============================
      =======Upload anhdaidien====
==============================
*/
var Storage_anhdaidien = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/forms/anhdaidien");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

router.post("/api/anhdaidien", function (req, res) {
    var upload = multer({
		storage: Storage_anhdaidien,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
			}
			callback(null, true)
		}
	}).single('anhdaidien');
	upload(req, res, function(err) {
	   res.end(req.file.filename);
	})
});
/*==============================
      =======Upload cv====
==============================
*/

var Storage_cv = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/forms/filecv");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

router.post("/api/uploadcv", function (req, res) {
    var upload = multer({
		storage: Storage_cv,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.pdf' ) {
				return callback(res.end('Only PDF are allowed'), null)
			}
			callback(null, true)
		}
	}).single('file_cv');
	upload(req, res, function(err) {
	   res.end(req.file.filename);
	})
  
});
/*==============================
      =======Upload cv====
        upload_cv(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        console.log(req.file.filename)
        return res.end(req.file.filename);
    });
    function fileFilter(req, file, cb){
    const extension = file.mimetype.split('/')[0];
    if(extension !== 'video'){
        return cb(new Error('Something went wrong'), false);
    }
    cb(null, true);
};
==============================
*/



module.exports = router;