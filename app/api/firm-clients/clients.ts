
type ClientData = {
    // Define the client data structure (adapt this based on actual data structure)
    id: string;
    name: string;
    address: string;
    city_state_zip: string;
    social_security_number: string;
    email: string;
    telephone: string;
    portfolio_value: number;
};

export const checkClientInList = async (clientName: string): Promise<ClientData | null> => {
    try {
        // Point to the new server route instead of the direct API
        const response = await fetch('/api/firm-clients', {next: {revalidate: 1}});
        if (!response.ok) {
            throw new Error('Failed to fetch clients data.');
        }
        const clients: ClientData[] = await response.json();
        const clientData = clients.find(client => client.name.toLowerCase() === clientName.toLowerCase());
        return clientData || null;
    } catch (error) {
        console.error('Error checking client in list:', error);
        return null;
    }
};