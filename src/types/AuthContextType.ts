export interface AuthContextType {
    user: any; // Replace with your user type
    loading: boolean;
    signOut: () => Promise<void>;
}