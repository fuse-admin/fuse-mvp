import { GenericClientData } from "@/types";

export const checkClientInList = async (clientName: string, orgId: string): Promise<GenericClientData | null> => {
    try {
        let fetchClientsFunction: () => Promise<GenericClientData[]>;

        switch(orgId) {
            case 'org_2bLHjXtOFDFbhCv7hfXMYt7ucNM':
                fetchClientsFunction = (await import('./fuse-clients/clients')).fetchClientsForFuseAI;
                break;
            {/*case 'org_2Id':
                fetchClientsFunction = (await import('./organizations/org_2/clients')).fetchClientsForOrg2;
                break; */}
            // Add more cases as needed
            default:
                throw new Error('Unknown organization ID');
        }

        const clients = await fetchClientsFunction();
        const clientData = clients.find(client => client.name.toLowerCase() === clientName.toLowerCase());
        return clientData || null;
    } catch (error) {
        console.error('Error checking client in list:', error);
        return null;
    }
};


export const fetchClientsForOrganization = async (orgId: string): Promise<GenericClientData[]> => {
    try {
      let fetchClientsFunction: () => Promise<GenericClientData[]>;
  
      switch(orgId) {
        case 'org_2bLHjXtOFDFbhCv7hfXMYt7ucNM':
            fetchClientsFunction = (await import('./fuse-clients/clients')).fetchClientsForFuseAI;
            break;
        // Add more cases as needed for different organizations
        default:
            throw new Error('Unknown organization ID');
      }
  
      const clients = await fetchClientsFunction();
      return clients;
    } catch (error) {
      console.error('Error fetching clients for organization:', error);
      throw error;
    }
  };
  