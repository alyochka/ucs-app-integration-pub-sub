import { PubSubMessageModel } from '#models/pub_sub'
import { UserPubSub } from '#services/user_pub_sub'

export class PubSubMessageHandler {
  async handle(pubsubModel: PubSubMessageModel<any>): Promise<boolean> {
    switch (pubsubModel.table) {
      case 'users':
        return await new UserPubSub(pubsubModel).handlerAction()
    }
  }
}
