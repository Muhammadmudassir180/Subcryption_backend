import {createRequire} from "module";
import dayjs  from "dayjs";
const require = createRequire(import.meta.url);
const {serve}=require("@upstash/workflow/express")

import subscription from "../models/subscriptionModel.js";
import {sendReminderEmail} from "../utils/send-email.js";

const Reminders=[7,5,2,1];


export const sendReminder = serve(async (context)=>{
    const {subscriptionId}=context.requestPayload;
    const subscription=await fetchsubcription(context,subscriptionId);
    if (!subscription || subscription.status!= 'active'){
        return;
    }

    const renewalDate=dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal Date has passed for Subscription ${subscriptionId}. Stopping Workflow `);
        return;
    }
    for (const daysBefore of Reminders){
        const reminderDate= renewalDate.subtract(daysBefore,  "day");

        if(reminderDate.isAfter(dayjs())){
            await sleepuntilreminder(context, `${daysbefore} days before reminder`, reminderDate);
        }

        if(dayjs().isSame(reminderDate,'day')){
            await triggerReminder(context, `Reminder ${daysbefore} days before`, subscription);
        }


    }
});

const fetchsubcription=async (context,subscriptionId)=>{
    return await context.run("get subscription", async ()=>{
        return subscription.findById(subscriptionId).populate("user", 'name email');

        }

    )
}

const sleepuntilreminder=async (context,label,date)=>{
    console.log(`Sleep until ${label} reminder at date ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder=async (context,label,subscription)=>{
    return await context.run("get subscription",async ()=>{
        console.log(`Triggering ${label} reminder `);
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,

        })
    })
    }