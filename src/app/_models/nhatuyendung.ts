

export class Nhatuyendung {
  constructor(
 public fullname: String,
 public email:  String,
public  password:  String,
public  resetPasswordToken: String,
public  resetPasswordExpires: String,
public  createddate: Date,
public  role:  String,
 public info_recruiter:{
  namecompany: String,
  website: String,
  facebook: String,
  phone: String,
  introduction : String,
  logo : String,
  profileimage : String,
  address: String,
  active : Boolean,
  companysizeid :String,
  countryid : String}
  ) {
  }
}
