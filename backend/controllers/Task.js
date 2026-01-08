import ContactModel from "../models/ContackModel.js";
import opportunityModel from "../models/OpportunityModel.js";
import TaskModel from "../models/TaskModel.js";
import TasksModel from "../models/Tasks.js";
import UserModel from "../models/UserModel.js";

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
    const { fullname, email, phone,company_name ,linked, status,Assign } = req.body;

    const task = await ContactModel.create({
      fullname,
      email,
      phone,
      company_name,
      linked,
      status,
      Assign
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
      Description,
    } = req.body;

    const dataToSave = {
      opportunitie,
      company_name,
      rate,
      close_Date,
      stage,
      lead_Source,
      AssignedTo,
      Description,
    };

    if (stage=="Close") {
      dataToSave.closedAt=new Date()
    }

    let oppo = await opportunityModel.create(dataToSave);
    return res.status(200).json({ message: "Add Successfully" });
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
    console.log("▶️ editStage called");
    console.log("📥 Request body:", req.body);

    const { id, stage } = req.body;

    if (!id || !stage) {
      console.error("❌ Missing id or stage", { id, stage });
      return res
        .status(400)
        .json({ message: "Missing required fields: id or stage" });
    }

    const updateData = { stage };

    if (stage === "Close") {
      updateData.closedAt = new Date();
      console.log("✅ Stage is Close, setting closedAt:", updateData.closedAt);
    } else {
      console.log("ℹ️ Stage is not Close, closedAt not modified");
    }

    console.log("📝 Update payload:", updateData);

    const updatedOpportunity = await opportunityModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedOpportunity) {
      console.error("❌ Opportunity not found for id:", id);
      return res.status(404).json({ message: "Opportunity not found" });
    }

    console.log("✅ Opportunity updated:", {
      id: updatedOpportunity._id,
      stage: updatedOpportunity.stage,
      closedAt: updatedOpportunity.closedAt,
    });

    return res.status(200).json({
      message: "Stage updated successfully",
      data: updatedOpportunity,
    });
  } catch (error) {
    console.error("🔥 Error in editStage:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const opportunityFilter = async (req, res) => {
  try {
   
    const {
      stage=[],
      AssignedTo=[],
      lead_Source=[],
    closeDateFrom,
    closeDateTo
    } = req.body||{};

  
    let query = {};

    if (stage.length > 0) {
      query.stage = { $in: stage };
    }

    if (AssignedTo.length > 0) {
      query.AssignedTo = { $in: AssignedTo };
    }

    if (lead_Source.length > 0) {
      query.lead_Source = { $in: lead_Source };
    }

    if (closeDateFrom||closeDateTo) {
      query.close_Date={}
      if (closeDateFrom) {
        
        query.close_Date.$gte=closeDateFrom
      }
      if (closeDateTo) {
        
        query.close_Date.$lte=closeDateTo
      }
    }

    const data = await opportunityModel.find(query);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Filter error" });
  }
};








export const leadFilter=async(req,res)=>{
  try {
    const {status,activity,company,Assign}=req.body
    let query={}
    if (status.length>0) {
      query.status={$in:status}
    }
    if (activity) {
      const now=new Date()
      const past=new Date()

      if (activity=="today") {
        past.setHours(0,0,0,0)
      }
      if (activity=="yesterday") {
        past.setDate(now.getDate()-1)
         pastDate.setHours(0, 0, 0, 0);
  
      }
      if (activity=="7d") {
        past.setDate(now.getDate()-7)
      }
      if (activity=="30d") {
        past.setDate(now.getDate()-30)
      }
      
      query.createdAt={$gte:past}

    }
    if (company) {
      query.company_name={$regex:company,$options:"i"}
    }
    if (Assign) {
      query.Assign=Assign
    }

    const data=await ContactModel.find(query)

    return res.status(200).json(data)

  } catch (error) {
    console.log(error);
    
  }
}







export const GetUser = async (req, res) => {
  try {
    const data = await UserModel.find();
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};









export const AddTasks = async (req, res) => {
  try {
    const {
      Title,
      DUE_DATE,
      Due_Time,
      Priority,
      Assignee,
      ContactDeal,
      Reminder,
      Notes
    } = req.body;

    let Task = await TasksModel.create({
      Title,
      DUE_DATE,
      Due_Time,
      Priority,
      Assignee,
      ContactDeal,
      Reminder,
      Notes
    });
    return res.status(200).json({ message: "Add Successfully" });
  } catch (error) {
    console.log(error);
  }
};






export const FetchTasks = async (req, res) => {
  try {
    const data = await TasksModel.find();
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};



export const revenue = async (req, res) => {
  try {
    const data = await opportunityModel.aggregate([
      {
        $match: {
          stage: "Close",
          close_Date: { $ne: null },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: { $toDate: "$close_Date" } },
            month: { $month: { $toDate: "$close_Date" } },
          },
          revenue: { $sum: { $toDouble: "$rate" } },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          monthNumber: "$_id.month",
          month: {
            $arrayElemAt: [
              [
                "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
              ],
              "$_id.month"
            ]
          },
          revenue: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Revenue calculation failed" });
  }
};


