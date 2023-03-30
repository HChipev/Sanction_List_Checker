// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== useRuntimeConfig().public.token
  ) {
    return { error: { message: "Wrong authorization header" } };
  }

  const supabase = serverSupabaseClient(event);
  const { data: companies, error } = await supabase
    .from("Companies")
    .select("*");

  if (error) {
    return error;
  }

  for (const company of companies) {
    await $fetch(`/api/companies/check/${company.EIK}`, {
      method: "POST",
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
      body: { name: company.company_name, owners: company.owners },
    });
  }

  // for (const company of data) {
  //   for (const subject of sanctionLists.subjects) {
  //     if (company.EIK === subject.EIK) {
  //       const { error } = await supabase
  //         .from("Companies")
  //         .update({
  //           sanction_lists: subject.agg_sanctionListType.map((list) => {
  //             return {
  //               id: list.id,
  //               name: list.name,
  //             };
  //           }),
  //         })
  //         .eq("EIK", company.EIK);

  //       if (error) {
  //         return error;
  //       }
  //     }
  //   }
  // }

  // const { error2 } = await supabase
  //   .from("Companies")
  //   .update({
  //     last_checked: new Date(),
  //   })
  //   .gt("EIK", 0);

  return { error };
});
