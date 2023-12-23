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
