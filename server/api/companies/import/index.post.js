export default defineEventHandler(async (event) => {
  const { data } = await readBody(event);
  console.log(await readBody(event), data);
  return { error: { message: "Not implemented yet" } };
});
