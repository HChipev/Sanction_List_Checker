export default defineEventHandler((event) => {
  const { EIK } = event.context.params;
  console.log(EIK);
  return EIK;
});
