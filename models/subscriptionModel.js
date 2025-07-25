import mongoose, { mongo } from "mongoose";

const subscriptionSchema= new mongoose.Schema({
    name:{
    type: String,
    required: [true, "Subscription Name is required"],
    minLength: 2, 
    maxLength: 100,
    trim:true
},
    price:{
    type:Number,
    required: [true, "Price of subscryption is required"],
    min: [0, "Price must be greater than 0"],
    max: [1000, "price must be less than 1000"],
    },
    currency:{
        type: String,
        enum:["USD","EUR","PKR","GBP"], 
        default: "USD",
    }, 
    frequency:{
        type: String,
        enum:["daily", "weekly", "monthly", "yearly"], 
    },
    category:{
        type: String, 
        enum:["sports", "news", "lifesytle", "technology", "finance", "politics", "other"],
        required:true
    },
    paymentmethod: {
        type: String,
        required:true,
        trim:true
    },
    status:{
        type: String,
        enum:["active","cancelled", "expired"], 
        defualt: "active",
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator: (value)=> value<= new Date(),
            message: "Start date must be in the past",
        }
    },
    renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator: function (value){
                return value> this.startDate;
            },
            message: "Renewal Date must be after the start Date",
        }
    }, 
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        index:true,

    }

},{timeseries:true});


// Auto-calculate renewal date if missing 
subscriptionSchema.pre("save",function(next){
    if (!this.renewalDate){
        const renewalPeriods= {
            daily:1,
            weekly:7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequenc]);

    }
    //Auto-update the status if renewal date has passed 
    if (this.renewalDate<new Date()){
        this.status="expired";
    }
    next();

})

const subscription=mongoose.model("Subscription", subscriptionSchema);

export default subscription;