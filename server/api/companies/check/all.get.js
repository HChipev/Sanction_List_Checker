import sanctionLists from "~/data/test.json";
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const { data, error } = await supabase.from("Companies").select("EIK");

  if (error) {
    return error;
  }

  for (const company of data) {
    for (const subject of sanctionLists.subjects) {
      if (company.EIK === subject.EIK) {
        const { error } = await supabase
          .from("Companies")
          .update({
            sanction_lists: subject.agg_sanctionListType.map((list) => {
              return {
                id: list.id,
                name: list.name,
              };
            }),
          })
          .eq("EIK", company.EIK);

        if (error) {
          return error;
        }
      }
    }
  }

  const { error2 } = await supabase
    .from("Companies")
    .update({
      last_checked: new Date(),
    })
    .gt("EIK", 0);

  return { error, error2 };
});
