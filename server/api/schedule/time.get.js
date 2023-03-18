import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  useRuntimeConfig().public.supabase.url,
  useRuntimeConfig().public.supabase.key
);
export default defineEventHandler(async (event) => {
  const {
    data: { time },
  } = await supabase.from("Schedule").select("time").match({ id: 1 }).single();
  return time;
});
