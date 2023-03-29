// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   useRuntimeConfig().public.supabase.url,
//   useRuntimeConfig().public.supabase.key
// );
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== useRuntimeConfig().public.token
  ) {
    return { error: { message: "Wrong authorization header" } };
  }

  const supabase = serverSupabaseClient(event);
  const { EIK } = event.context.params;
  //! name if refactoring is needed
  const name = await readBody(event);

  const apis = await $fetch("https://web-api.apis.bg/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      username: useRuntimeConfig().public.apis.username,
      password: useRuntimeConfig().public.apis.password,
    },
  });

  const data = await $fetch("https://web-api.apis.bg/api/Sanctions/Search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apis.accessToken}`,
    },
    body: {
      searchText: EIK,
    },
  });

  const sanctionListsSet = new Set();
  for (const subject of data.subjects) {
    sanctionListsSet.add(subject.sanctionListType);
  }
  const sanctionLists = [];
  for (const list of sanctionListsSet) {
    sanctionLists.push({ id: list });
  }

  const { error } = await supabase
    .from("Companies")
    .update({ sanction_lists: sanctionLists, last_checked: new Date() })
    .eq("EIK", EIK);

  if (error) {
    return error;
  }

  return sanctionLists;
});
