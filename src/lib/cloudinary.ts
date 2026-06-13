import { v2 as cloudinary, UploadStream } from 'cloudinary'

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary=async (file:Blob):Promise<string | null>=>{
  console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key Exists:", !!process.env.CLOUDINARY_API_KEY);
console.log("API Secret Exists:", !!process.env.CLOUDINARY_API_SECRET);
if(!file){
    return null
}
try {
    const arrayBuffer=await file.arrayBuffer()
    const buffer=Buffer.from(arrayBuffer)

    return new Promise((resolve,reject)=>{
      const uploadStream=cloudinary.uploader.upload_stream({
        resource_type:"auto"
      },(error,result)=>{
        if(error){
          console.error("Cloudinary Error:", error);
            reject(error)
        }else{
            resolve(result?.secure_url ?? null)
        }
      })


    uploadStream.end(buffer)

    }


)


} catch (error) {
    // console.log(error)
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key Exists:", !!process.env.CLOUDINARY_API_KEY);
console.log("API Secret Exists:", !!process.env.CLOUDINARY_API_SECRET);
    return null
}
}


export default uploadOnCloudinary