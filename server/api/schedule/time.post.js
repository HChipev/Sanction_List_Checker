import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  useRuntimeConfig().public.supabase.url,
  useRuntimeConfig().public.supabase.key
);
export default defineEventHandler(async (event) => {
  const { time } = await readBody(event);
  const { data: existingTime, error: etError } = await supabase
    .from("Schedule")
    .select("time")
    .match({ id: 1 });

  if (existingTime.length > 0) {
    const { data, error } = await supabase
      .from("Schedule")
      .update({ time: time })
      .eq("id", 1);
  } else {
    console.log(time);
    const { data, error } = await supabase
      .from("Schedule")
      .insert([{ id: 1, time: time }]);
  }
  useNitroApp().hooks.callHook("update:api/schedule/time");
  return { existingTime, etError };
});
