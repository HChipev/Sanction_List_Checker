import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
const supabase = createClient(
  useRuntimeConfig().public.supabase.url,
  useRuntimeConfig().public.supabase.key
);
const schema = Joi.object({
  EIK: Joi.string().required().min(9).max(9),
  company_name: Joi.string().required(),
});
export default defineEventHandler(async (event) => {
  const { EIK, company_name } = await readBody(event);
  const { error: validationError } = schema.validate({ EIK, company_name });
  if (validationError) {
    return { validationError };
  }

  const { data, error } = await supabase
    .from("Companies")
    .insert([{ EIK: EIK, company_name: company_name }]);
  return { data, error };
});
