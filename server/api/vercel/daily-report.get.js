import nodemailer from "nodemailer";
import mailGenerator from "mailgen";
export default eventHandler(async () => {
  await dailyCheck();
  return {
    statusCode: 200,
  };
});

const dailyCheck = async function () {
  await $fetch("/api/companies/check/all", {
    headers: {
      Authorization: useRuntimeConfig().public.token,
    },
  });
  const { data: allCompaniesData } = await $fetch("/api/companies/all", {
    headers: {
      Authorization: useRuntimeConfig().public.token,
    },
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
  const { data } = await $fetch("/api/emails/all", {
    headers: {
      Authorization: useRuntimeConfig().public.token,
    },
  });
  const emailsList = data.map((email) => email.email);

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
        reject(error);
      } else {
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
    to: emailsList,
    subject: "Daily Report 📄",
    html: mail,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
