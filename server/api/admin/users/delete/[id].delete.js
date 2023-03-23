// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().private.supabase.key

import { serverSupabaseServiceRole } from "#supabase/server";

// );
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const { data, error } = await serverSupabaseServiceRole(
    event
  ).auth.admin.deleteUser(id);
  return { data, error };
});
