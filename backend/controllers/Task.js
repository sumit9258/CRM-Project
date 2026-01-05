import ContactModel from "../models/ContackModel.js";
import opportunityModel from "../models/OpportunityModel.js";
import TaskModel from "../models/TaskModel.js";

export const AddTask = async (req, res) => {
  try {
    const { description, duedate, priority, searchcompany } = req.body;

    const task = await TaskModel.create({
      description,
      due_date: duedate,
      priority,
      company_name: searchcompany,
    });
    return res.status(201).json({ message: "your task addded" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTask = async (req, res) => {
  try {
    let task = await TaskModel.find();

    return res.status(201).json({ task });
  } catch (error) {
    console.log(error);
  }
};

export const EditTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const { description, duedate, priority, searchcompany } = req.body;

    const task = await TaskModel.findByIdAndUpdate(
      id,
      {
        description,
        due_date: duedate,
        priority,
        company_name: searchcompany,
      },
      { new: true }
    );
    return res.status(201).json({ message: "your task edited" });
  } catch (error) {
    console.log(error);
  }
};

export const Lead = async (req, res) => {
  try {
    const { fullname, email, phone, linked, status } = req.body;

    const task = await ContactModel.create({
      fullname,
      email,
      phone,
      linked,
      status,
    });
    return res.status(201).json({ message: "your task addded" });
  } catch (error) {
    console.log(error);
  }
};

export const GetLead = async (req, res) => {
  try {
    const data = await ContactModel.find();
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const opportunity = async (req, res) => {
  try {
    const {
      opportunitie,
      company_name,
      rate,
      close_Date,
      stage,
      lead_Source,
      AssignedTo,
      Description
    } = req.body;

    let oppo=await opportunityModel.create({
 opportunitie,
      company_name,
      rate,
      close_Date,
      stage,
      lead_Source,
      AssignedTo,
      Description
    })
return res.status(200).json({message:"Add Successfully"})
  } catch (error) {
    console.log(error);
  }
};







export const GetOpportunity = async (req, res) => {
  try {
    const data = await opportunityModel.find();
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const editStage = async (req, res) => {
  try {
    const { id, stage } = req.body;

   
    if (!id || !stage) {
      return res.status(400).json({ message: "Missing required fields: id or stage" });
    }

  
    const updatedOpportunity = await opportunityModel.findByIdAndUpdate(
      id,
      { stage },
      { new: true, runValidators: true } 
    );

    
    if (!updatedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }


    return res.status(200).json({ 
      message: "Stage updated successfully", 
      data: updatedOpportunity 
    });

  } catch (error) {
    console.error("Error updating stage:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};










export const opportunityFilter = async (req, res) => {
  try {
    const {
      stage,
      lead_Source,
      AssignedTo
    } = req.body;

    let oppo=await opportunityModel.create({
 opportunitie,
      company_name,
      rate,
      close_Date,
      stage,
      lead_Source,
      AssignedTo,
      Description
    })
return res.status(200).json({message:"Add Successfully"})
  } catch (error) {
    console.log(error);
  }
};
