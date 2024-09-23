const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema ({
    title : {
        type : String,
        required : true,
    },
    description : String,
    date: {
        type: Date, // To store the date of the listing
        required: true, 
    },
    time: {
        type: String, // Storing time as string in HH:MM format
        required: true,
    },
    duration: {
        type: Number, // Duration in minutes or hours
        required: true,
    }   
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

/* listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
    await Review.deleteMany({_id :{$in: listing.reviews}});
    }
}); */

