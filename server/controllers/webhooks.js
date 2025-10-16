import { Webhook } from "svix";
import User from "../models/User";

// API Controller function to manage clerks user with database

export const clerkWebhooks = async (req, res) => {
  try {
    //Create a Svix intsance with clerk webhook scret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //Verifying Headers

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Geeting data from request body
    const { data, type } = req.body;

    //Switch Cases for different events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_addresses,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_addresses,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        brrak;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Webhooks Error" });
  }
};
