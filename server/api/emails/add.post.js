// import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
import { serverSupabaseClient } from "#supabase/server";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "bg"] },
    })
    .required(),
});
export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== useRuntimeConfig().public.token
  ) {
    return { error: { message: "Wrong authorization header" } };
  }

  const supabase = serverSupabaseClient(event);
  const { email } = await readBody(event);
  const { error: validationError } = schema.validate({ email });
  if (validationError) {
    return { validationError };
  }

  const { data, error } = await supabase
    .from("Emails")
    .insert([{ email: email }]);
  return { data, error };
});
