type Fuse_ClientData = {
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

const FUSE_AI_API_ENDPOINT = 'https://654ee273358230d8f0ccdecf.mockapi.io/api/clients/Client';

export async function fetchClientsForFuseAI(): Promise<Fuse_ClientData[]>{
    const response = await fetch(FUSE_AI_API_ENDPOINT);
    console.log("response", response)
    if (!response.ok) {
        throw new Error('Failed to fetch clients data.');
    }
    return response.json();

}