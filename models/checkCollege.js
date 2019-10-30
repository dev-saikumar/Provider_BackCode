let myfunction= function checkCollegeName(clgname){
var collegeList=['biher','lps','shs'];
for (let index = 0; index < 3; index++) {
   if(clgname==collegeList[index]){
    return true;
    }
}
return false;
}
exports.checkClg=myfunction;