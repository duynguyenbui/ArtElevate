export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export function formatDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Date(dateTimeString).toLocaleString('en-US', options);
}

export function formatBidStatus(status: string): string {
  switch (status) {
    case 'Accepted':
      return 'Accepted';
    case 'AcceptedBelowReserve':
      return 'Accepted Below Reserve';
    case 'TooLow':
      return 'Too Low';
    case 'Finished':
      return 'Finished';
    default:
      return 'Invalid Status';
  }
}
