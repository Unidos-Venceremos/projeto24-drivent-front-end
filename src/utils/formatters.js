/* eslint-disable indent */
import Payment from 'payment';

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatName(value) {
  value.replace(/[0-9]/g, '').trim();

  return value;
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19
      )}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === 'amex' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}

export const formatAccomodation = (accomodation) => {
  let finalString = '';
  const lastItem = accomodation.length - 1;

  for (let index = 0; index < accomodation.length; index++) {
    const item = accomodation[index];

    if (index === lastItem) {
      finalString += item;
      continue;
    }

    if (index === lastItem - 1) {
      finalString += `${item} e `;
    } else {
      finalString += `${item}, `;
    }
  }

  return finalString;
};

export const formatActivitiesDate = (date) => {
  if (!date) return '';

  let dateInIsoString = new Date(date).toISOString();
  dateInIsoString = dateInIsoString.split('T')[0] + 'T04:00:00.000Z';
  const dateEvent = new Date(dateInIsoString);

  let weekday =
    dateEvent
      .toLocaleDateString('pt-BR', {
        weekday: 'long',
      })[0]
      .toUpperCase() + dateEvent.toLocaleDateString('pt-BR', { weekday: 'long' }).slice(1);

  weekday = weekday?.includes('-') ? weekday.split('-')[0] : weekday;

  const dayEvent = String(dateEvent.getDate()).padStart(2, '0');
  const monthEvent = String(dateEvent.getMonth() + 1).padStart(2, '0');

  return `${weekday}, ${dayEvent}/${monthEvent}`;
};
