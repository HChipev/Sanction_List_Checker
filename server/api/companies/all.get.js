import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  useRuntimeConfig().public.supabase.url,
  useRuntimeConfig().public.supabase.key
);
export default defineEventHandler(async (event) => {
  const { data, error } = await supabase
    .from("Companies")
    .select("*")
    .order("EIK", { ascending: true });

  return { data, error };
});
