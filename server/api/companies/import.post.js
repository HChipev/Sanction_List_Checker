import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== useRuntimeConfig().public.token
  ) {
    return { error: { message: "Wrong authorization header" } };
  }

  let data = await readBody(event);

  const { data: companiesToCheck, error } = await serverSupabaseClient(event)
    .from("Companies")
    .insert(data)
    .select("*");

  if (error) {
    return { error: { message: "No new companies to import!" } };
  }

  for (const company of companiesToCheck) {
    await $fetch(`/api/companies/check/${company.EIK}`, {
      method: "POST",
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
      body: { name: company.company_name, owners: company.owners },
    });
  }

  return { error };
});
