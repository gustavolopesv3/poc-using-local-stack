import { CreateQueueCommand, SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const client = new SQSClient({
    endpoint: 'https://localhost.localstack.cloud:4566',
    region: 'us-east-1',
    forcePathStyle: true,
})

const createdQueue = async () => {
    const command = new CreateQueueCommand({
        QueueName: 'my-queue-local-stack',
    })
    const data = await client.send(command) // https://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/my-queue-local-stack
    console.log(data)
}

// createdQueue()

const sendMessage = async (index) => {
    const command = new SendMessageCommand({
        MessageBody: `Hello Local-stack from SQS: ${index}`,
        QueueUrl: 'https://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/my-queue-local-stack',
    })
    const data = await client.send(command) // https://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/my-queue-local-stack
    console.log(data)
}

// send 10 messages
const array = Array.from(Array(10).keys())
array.forEach((_, index) => {
    sendMessage(index)
})
sendMessage()