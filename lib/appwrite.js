import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

export const config = {
    endopoint: 'https://cloud.appwrite.io/v1',
    platform: 'co.edu.sena',
    projectId: '66c90db70039a94dc6c1',
    databaseId: '66e8ef24002308a70909',
    userCollectionId: '66e8ef79000664f0fee9',
    videoCollectionId: '66e8effd0004d6691382',
    storageId: '66e8f3220035f4e2ad8b'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endopoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);



export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
}

