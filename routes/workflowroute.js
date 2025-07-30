import {Router} from "express";
import {sendReminder} from "../controllers/workflowcontroller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendReminder);

export default workflowRouter;
