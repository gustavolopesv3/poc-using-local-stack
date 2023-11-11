import {S3Client, CreateBucketCommand, PutObjectCommand, DeleteBucketCommand, DeleteObjectCommand} from '@aws-sdk/client-s3'
import fs from 'fs' 

const client = new S3Client({
    endpoint: 'https://localhost.localstack.cloud:4566',
    region: 'us-east-1',
    forcePathStyle: true, // obrigatório para o localstack
})

const createBucket = async () => {
    const command = new CreateBucketCommand({
        Bucket: 'my-bucket-nodejs',
    })
    const data = await client.send(command)
    console.log(data)

}

// createBucket()

const uploadFile = async () => {
    const file = fs.readFileSync('./teste.txt')
    const command = new PutObjectCommand({
        Bucket: 'my-bucket-nodejs',
        Key: 'teste.txt',
        Body: file,
    })
    const data = await client.send(command)
    console.log(data)
}

uploadFile()