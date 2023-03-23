import { serverSupabaseServiceRole } from "#supabase/server";
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().private.supabase.key
// );
export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== useRuntimeConfig().public.token
  ) {
    return { error: { message: "Wrong authorization header" } };
  }

  const { data, error } = await serverSupabaseServiceRole(
    event
  ).auth.admin.listUsers();
  data.users = data.users.filter(
    (user) => user.email !== useRuntimeConfig().public.admin
  );

  return { data, error };
});
