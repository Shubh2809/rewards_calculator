export const fetchTransactions = async () => {
    try {
        const response = await fetch('/transactionsData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured")
    }
  };