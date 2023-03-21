// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const { EIK } = event.context.params;
  const { data, error } = await supabase
    .from("Companies")
    .delete()
    .eq("EIK", EIK);
  return { data, error };
});
