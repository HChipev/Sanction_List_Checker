// import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
import { serverSupabaseClient } from "#supabase/server";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
const schema = Joi.object({
  EIK: Joi.string().required().min(9).max(9),
  company_name: Joi.string().required(),
});
export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== useRuntimeConfig().public.token
  ) {
    return { error: { message: "Wrong authorization header" } };
  }

  const supabase = serverSupabaseClient(event);
  const { EIK, company_name } = await readBody(event);
  const { error: validationError } = schema.validate({ EIK, company_name });
  if (validationError) {
    return { validationError };
  }

  const { data, error } = await supabase
    .from("Companies")
    .insert([{ EIK: EIK, company_name: company_name }]);

  await $fetch(`/api/companies/check/${EIK}`, {
    headers: {
      Authorization: useRuntimeConfig().public.token,
    },
  });

  return { data, error };
});
