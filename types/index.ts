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