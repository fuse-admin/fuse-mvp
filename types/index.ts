// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== Chatbox Props
export type AiChatBoxProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export type InstructionBoxProps = {
  selectedTab: string;
};

// ====== ClientData Type
export type GenericClientData = {
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