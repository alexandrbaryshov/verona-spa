export function validSavedAnswers(a) {
  if (!a || typeof a !== 'object' || Array.isArray(a)) return false;
  return ['1','2'].includes(a.guests) && ['0','100','120','150','180'].includes(a.time)
    && typeof a.budget === 'string' && (a.budget === '' || (/^\d+$/.test(a.budget) && Number.isSafeInteger(Number(a.budget))));
}
