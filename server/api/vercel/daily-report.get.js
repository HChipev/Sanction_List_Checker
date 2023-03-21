import nodemailer from "nodemailer";
import mailGenerator from "mailgen";
export default async function handler() {
  await dailyCheck();
  console.log("Daily report sent!");
  console.log("Second log");
  return { statusCode: 200 };
}

const dailyCheck = async function () {
  await $fetch("/api/companies/check/all");
  const { data } = await $fetch("/api/companies/all");
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
  createMail(allCompaniesReport);
};

//* Mail logic
const createMail = function (allCompaniesReport) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
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

  transporter.sendMail(message);
};
