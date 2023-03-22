import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  useRuntimeConfig().public.supabase.url,
  useRuntimeConfig().private.supabase.key
);
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const { data, error } = await supabase.auth.admin.deleteUser(id);
  return { data, error };
});
