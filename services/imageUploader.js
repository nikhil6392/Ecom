import s3 from '../s3.config/'

export const fileUpload= async({bucketName,key,body,contentType})=>{
    return await s3.upload({
        Bucket:bucketName,
        Key: key,
        Body: body,
        ContentType: contentType
    })
    .promise()
}

export const deleteFile = async({bucketName,key})=>{
    return await s3.deleteObject({
        Bucket:bucketName,
        Key: key
    })
    .promise()

}