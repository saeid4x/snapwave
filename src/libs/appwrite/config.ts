import { Client, Account, Databases, Storage,Avatars } from "appwrite";

export const appwriteConfig = {
    projectId:'6667ea19002ba891fb20',
    url:'https://cloud.appwrite.io/v1',
    databaseId:"666bdbc90023dff6bcfa",
    storageId:"666bda9600353b5e63b2",
    userCollectionId:"666bde0300154f28768d",
    postCollectionId:"666bdc250021c7273baa",
    savesCollectionId:"666bde8600205b8dfa15"
}

export const client = new Client();

client.setProject(appwriteConfig.projectId)

 
client.setEndpoint(appwriteConfig.url)



export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);