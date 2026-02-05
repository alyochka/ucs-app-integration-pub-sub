import { PubSub } from '@google-cloud/pubsub'
import { PubSubActionEnum } from '#enums/pub_sub_action_enum'
import { PubSubMessageModel } from '#models/pub_sub'

export class GooglePubSubPublisher {
  constructor(topicName: string) {
    this._topicName = topicName
  }
  private _topicName: string
  async publishMessage(
    message: object,
    action: PubSubActionEnum,
    table: 'users',
    api?: 'API1' | 'API2'
  ) {
    // Gets topic
    const pubSubClient = new PubSub()
    const topic = pubSubClient.topic(this._topicName)

    // Stringifying ps message
    const payload = new PubSubMessageModel(message, action, table, api)
    const stringifiedPayload = JSON.stringify(payload)
    console.log(stringifiedPayload)

    // Sending message to the topic
    const response = await topic.publishMessage({ data: stringifiedPayload })
    console.log('response', response)
  }
}
