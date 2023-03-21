// import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
import { serverSupabaseClient } from "#supabase/server";
const schema = Joi.object({
  time: Joi.string().required(),
});
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const { time } = await readBody(event);
  const { validationError } = schema.validate({ time });

  const { data: existingTime, error } = await supabase
    .from("Schedule")
    .select("time")
    .match({ id: 1 });

  if (existingTime.length > 0) {
    await supabase.from("Schedule").update({ time: time }).eq("id", 1);
  } else {
    console.log(time);
    await supabase.from("Schedule").insert([{ id: 1, time: time }]);
  }

  useNitroApp().hooks.callHook("update:api/schedule/time");
  return { existingTime, error, validationError };
});
