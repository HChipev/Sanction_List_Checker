import schedule from "node-schedule";
import nodemailer from "nodemailer";
import mailGenerator from "mailgen";
let hours, minutes;

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.addHooks({
    "update:api/schedule/time": async () => {
      const time = await $fetch("/api/schedule/time");
      [hours, minutes] = time.split(":");
      schedule.rescheduleJob(
        "dailyReportTime",
        `${minutes} ${hours} * * *`,
        dailyCheck
      );
      console.log("Daily report time updated!");
    },
  });

  const time = await $fetch("/api/schedule/time");
  [hours, minutes] = time.split(":");
  schedule.scheduleJob(
    "dailyReportTime",
    `${minutes} ${hours} * * *`,
    dailyCheck
  );
  console.log("Daily report time init!");
});

const dailyCheck = async function () {
  await $fetch("/api/companies/check/all");
  const { data } = await $fetch("/api/companies/all");
  console.log(data);
  const allCompaniesData = data.filter((company) => {
    return company.sanction_lists.length > 0;
  });

  const allCompaniesReport = [];
  for (let i = 0; i < allCompaniesData.length; i++) {
    allCompaniesReport.push({
      EIK: allCompaniesData[i].EIK,
      ["Company Name"]: allCompaniesData[i].company_name,
      List1: allCompaniesData[i].sanction_lists.find((list) => list.id === 1)
        ? "✔"
        : "❌",
      List2: allCompaniesData[i].sanction_lists.find((list) => list.id === 2)
        ? "✔"
        : "❌",
      List3: allCompaniesData[i].sanction_lists.find((list) => list.id === 3)
        ? "✔"
        : "❌",
      List4: allCompaniesData[i].sanction_lists.find((list) => list.id === 4)
        ? "✔"
        : "❌",
      List5: allCompaniesData[i].sanction_lists.find((list) => list.id === 5)
        ? "✔"
        : "❌",
      List6: allCompaniesData[i].sanction_lists.find((list) => list.id === 6)
        ? "✔"
        : "❌",
      List7: allCompaniesData[i].sanction_lists.find((list) => list.id === 7)
        ? "✔"
        : "❌",
      List8: allCompaniesData[i].sanction_lists.find((list) => list.id === 8)
        ? "✔"
        : "❌",
      ["Last Checked"]: new Date(
        allCompaniesData[i].last_checked
      ).toLocaleString(),
    });
  }
  await createMail(allCompaniesReport);
};

//* Mail logic
const createMail = async function (allCompaniesReport) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: useRuntimeConfig().public.email,
      pass: useRuntimeConfig().public.password,
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
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
        data: [...allCompaniesReport],
      },
      outro: "Have a great day!",
    },
  };

  let mail = mailGen.generate(response);

  let message = {
    from: `"Sanction List Checker" <${useRuntimeConfig().public.email}>`,
    to: "icko15.8@gmail.com",
    subject: "Daily Report 📄",
    html: mail,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
