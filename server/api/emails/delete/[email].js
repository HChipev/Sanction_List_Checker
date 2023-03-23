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
  const { email } = event.context.params;
  const { data, error } = await supabase
    .from("Emails")
    .delete()
    .eq("email", email);
  return { data, error };
});
