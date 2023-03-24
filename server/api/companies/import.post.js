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

  for (const row of data) {
    row.company_name = row.Name;
    delete row.Name;
  }

  const { data: companiesToCheck, error } = await serverSupabaseClient(event)
    .from("Companies")
    .insert(data)
    .select("*");

  for (const company of companiesToCheck) {
    await $fetch(`/api/companies/check/${company.EIK}`, {
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
    });
  }

  return { error };
});
