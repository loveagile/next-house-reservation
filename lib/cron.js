import axios from "axios";
import cron from "node-cron";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const sendCompanyReservations = () => {
  cron.schedule("0 2 * * *", async () => {
    try {
      await axios.post(`${SITE_URL}/api/sendEmail/company`);
    } catch (error) {
      console.error("Error calling /api/sendEmail/company:", error.message);
    }
  });
};

const initializeCron = () => {
  sendCompanyReservations();
};

export default initializeCron;
