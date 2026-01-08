import express from "express"
import { AddTask, AddTasks, editStage, EditTask, fetchTask, FetchTasks, GetLead, GetOpportunity, GetUser, Lead, leadFilter, opportunity, opportunityFilter, revenue } from "../controllers/Task.js"
const taskRouter=express.Router()

taskRouter.post("/add-task",AddTask)
taskRouter.get("/fetch-task",fetchTask)
taskRouter.put("/edit-task/:id",EditTask)
taskRouter.post("/contact-lead",Lead)
taskRouter.get("/fetch-lead",GetLead)
taskRouter.post("/add-opportunity",opportunity)
taskRouter.get("/fetch-opportunity",GetOpportunity)
taskRouter.patch("/update-stage",editStage)
taskRouter.post("/filter-opportunity",opportunityFilter)
taskRouter.post("/filter-leads",leadFilter)
taskRouter.get("/get-users",GetUser)
taskRouter.post("/add-tasks",AddTasks)
taskRouter.get("/fetch-tasks",FetchTasks)
taskRouter.get("/filter-revenue",revenue)


export default taskRouter