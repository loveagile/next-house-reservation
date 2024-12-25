import axios from "axios";
import cron from "node-cron";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const sendReservationsToEmail = () => {
  cron.schedule("0 7 * * *", async () => {
    try {
      await axios.post(`${SITE_URL}/api/sendEmail/company`);
    } catch (error) {
      console.error("Error calling /api/sendEmail/company: ", error.message);
    }
  });
  cron.schedule("0 19 * * *", async () => {
    try {
      await axios.post(`${SITE_URL}/api/sendEmail/user`);
    } catch (error) {
      console.error("Error calling /api/sendEmail/user: ", error.message);
    }
  });
  cron.schedule("*/30 * * * *", async () => {
    try {
      await axios.post(`${SITE_URL}/api/sendEmail/timeToUser`);
    } catch (error) {
      console.error("Error calling /api/sendEmail/timeToUser: ", error.message);
    }
  });
};

const initializeCron = () => {
  sendReservationsToEmail();
};

export default initializeCron;
