const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync=require("./utils/wrapasync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");

 
const MONGO_URL = "mongodb://127.0.0.1:27017/ticket-management";


main()
.then( () => {
    console.log("Connected to DB");
})
.catch( (err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}  


app.listen(4040, () => {
    console.log("Server is listening to port 4040");
});

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//Root route
app.get("/",(req,res)=>{
    res.send("hyy I am root!");
});

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error)
    {
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}

//Index route
app.get("/listing",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));

//New route
app.get("/listing/new",wrapAsync(async(req,res)=>{
    res.render("./listings/new.ejs");
}));

//Show route
app.get("/listing/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    const formattedDate = new Date(listing.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    res.render("./listings/show.ejs",{listing,formattedDate});
}));

//Create route
app.post("/listing",validateListing,wrapAsync(async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
    
}));

//Edit route
app.get("/listing/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/update.ejs",{listing}); 
}));

//Update route
app.put("/listing/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
}));

//Delete route
app.delete("/listing/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listing");
}));

//error handling route
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

//error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    /*res.status(statusCode).send(message);*/
    res.status(statusCode).render("./listings/error.ejs",{err});
});

