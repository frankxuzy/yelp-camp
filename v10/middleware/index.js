
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, campground){
               if(err) {
                console.log(err);
                res.redirect("back");
               } else {
                        if(campground.author.id.equals(res.locals.currentUser)){
                            next();
                        } 
                        else {
                            res.redirect("back");
                        }                           
                   }
                });
            }  
     else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentsOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err) {
                console.log(err);
            } else {
                if(comment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect("back");
                }
            }
        });        
    } else {
        res.redirect("/login");
    }
}


middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        console.log("Loggedin");
        return next();
    }
    console.log("NotLoggedin");
    res.redirect("/login");
}


module.exports = middlewareObj;








