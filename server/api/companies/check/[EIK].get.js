import sanctionListTest from "~/data/test.json";
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const { EIK } = event.context.params;
  const { subjects } = sanctionListTest;
  const company = {
    EIK: "",
    agg_sanctionListType: "",
  };
  const lists = [];

  for (const subject of subjects) {
    if (subject.EIK === EIK) {
      company.EIK = subject.EIK;
      company.agg_sanctionListType = subject.agg_sanctionListType;
    }
  }

  for (let i = 0; i < company.agg_sanctionListType.length; i++) {
    lists.push({
      id: company.agg_sanctionListType[i].id,
      name: company.agg_sanctionListType[i].name,
    });
  }

  const { error } = await supabase
    .from("Companies")
    .update({ sanction_lists: lists, last_checked: new Date() })
    .eq("EIK", EIK);

  if (error) {
    return error;
  }

  return lists;
});
