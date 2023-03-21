// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key

import { serverSupabaseClient } from "#supabase/server";

// );
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const { data, error } = await supabase
    .from("Companies")
    .select("*")
    .order("EIK", { ascending: true });

  return { data, error };
});
