[for model examples](https://stackblitz.com/edit/stackblitz-starters-h6skzw?file=models%2Fecommerse%2Forder.models.js)

[For model of our app](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)


Which of the third party services we are using first we will add the images to the server temporally and then by third process we push it to the third party  


### Database 
1. Use try catch or promise while connecting db
2. Db is mostly in other continent so use async/await


### Notes
1. app.use is used for configration and middlewares
2. (err,req,res,next)=>{   next()<kidhar jana hai>}


## Registeration 
1. phle inputs purai hai y nhi from front ends
2. agar purai hai too already user to nhi hai same identity sai:  username or useremail
3. check for images
4. check for avatar mandatory
5. upload them(images) to cloudinary :: bha sai url milegaa
6. create  a user object ->
7. remove pass and referesh token
8. check for user creation
9. aur return response


## Login 
1. Phle inputs check kroo ... joo required fields hai boo puri hai y nhi
2. agar purai hai to db mai search kii user usss id y email sai hai y nhi
3. agar nhi hai to return krdooo user  doesnot exist
4. agar hai too password joo user nai dala hai uskoo bycrypt krke compare krooo db mai saved password sai 
5. agar same aata hai too user dedo aur access aur referest token bnaa do aur bhejdoo in the form of cookies


## LogOut 
1. Cookies delete krdooo
2. RefreshToken koo remove krdo User sai 
