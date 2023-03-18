import schedule from "node-schedule";
import nodemailer from "nodemailer";
import mailGenerator from "mailgen";
let hours, minutes;

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.addHooks({
    "update:api/schedule/time": async () => {
      const time = await $fetch("http://localhost:3000/api/schedule/time");
      [hours, minutes] = time.split(":");
      schedule.rescheduleJob(
        "dailyReportTime",
        `${minutes} ${hours} * * *`,
        dailyCheck
      );
    },
  });

  const time = await $fetch("http://localhost:3000/api/schedule/time");
  [hours, minutes] = time.split(":");
  schedule.scheduleJob(
    "dailyReportTime",
    `${minutes} ${hours} * * *`,
    dailyCheck
  );
});

const dailyCheck = function () {
  createMail();
};

//* Mail logic
const createMail = function () {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: useRuntimeConfig().public.email,
      pass: useRuntimeConfig().public.password,
    },
  });

  const mailGen = new mailGenerator({
    theme: "default",
    product: {
      name: "Sanction List Checker",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      intro: "Here is the daily report!",
      table: {
        data: [
          {
            item: "Test",
            description: "Test desc",
          },
        ],
      },
      outro: "Have a great day!",
    },
  };

  let mail = mailGen.generate(response);

  let message = {
    from: useRuntimeConfig().public.email,
    to: "icko15.8@gmail.com",
    subject: "Daily Report📄",
    html: mail,
  };

  transporter.sendMail(message);
};
