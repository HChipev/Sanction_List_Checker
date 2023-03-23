import { serverSupabaseServiceRole } from "#supabase/server";
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().private.supabase.key
// );

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event);
  const { data, error } = await serverSupabaseServiceRole(
    event
  ).auth.admin.createUser({
    email: email,
    password: password,
    user_metadata: { name: name },
  });

  return { data, error };
});
