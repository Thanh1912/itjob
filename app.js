var express= require('express');
var app = express();
app.use(express.static(__direname+'/src'));
app.listen(process.env.PORT||3000);