import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
constructor(){  
    this.databases
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);


   this.databases=new Databases(this.client);
   this.bucket=new Storage(this.client)
}
async createPost({title,slug,content,featureImage,status,userId}){
    try {
        return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featureImage,status,userId})
    } catch (error) {
        console.log("Appwrite service :: createPost :: error",error)
    }
}
async updatePost(slug,{title,content,featureImage,status,}){

    try {
return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featureImage,status,})        
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error",error)
    }
}
async deletePost(slug){
    try {
        return await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        return true;
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error",error)
        return false;
    }
}

async getPost(slug){
    try {
        return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
    } catch (error) {
        console.log("Appwrite service :: getPost :: error",error)
    }
}
async getAllPosts(queries=[Query.equal("status","active")]){

    try {
        return await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          queries
        );
    } catch (error) {
        console.log("Appwrite service :: getAllPosts :: error",error)
        return false;
    }
}
// file uplod service
async uplodFile(file){
try {
    await this.bucket.createFile(conf.appwriteBuckerId,ID.unique,file)
} catch (error) {
    console.log("Appwrite service :: uplodFile :: error",error)
    return false;
}

}

async deleteFile(fileId){   
    try {
        await this.bucket.deleteFile(conf.appwriteBuckerId,fileId)
        return true;    
    } catch (error) {
    console.log("Appwrite service :: deleteFile :: error",error)
    return false;
    }
}
getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.appwriteBuckerId,fileId)
}
}





const service= new Service();
export default service;