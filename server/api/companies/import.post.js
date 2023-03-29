import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== useRuntimeConfig().public.token
  ) {
    return { error: { message: "Wrong authorization header" } };
  }

  let data = await readBody(event);
  const { data: companies, getError } = await serverSupabaseClient(event)
    .from("Companies")
    .select("EIK");
  if (getError) {
    return { error: { ...getError } };
  }

  const existingEIKs = companies.map((company) => Number(company.EIK));
  data = data.filter((row) => !existingEIKs.includes(row.EIK));

  if (!data.length) {
    return { error: { message: "No new companies to import!" } };
  }

  console.log(data);

  const { data: companiesToCheck, error } = await serverSupabaseClient(event)
    .from("Companies")
    .insert(data)
    .select("*");
  console.log(companiesToCheck);

  for (const company of companiesToCheck) {
    await $fetch(`/api/companies/check/${company.EIK}`, {
      method: "POST",
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
      body: company.company_name,
    });
  }

  return { error };
});
