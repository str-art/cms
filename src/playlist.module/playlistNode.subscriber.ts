import { Between, EntitySubscriberInterface, EventSubscriber, InsertEvent, MoreThan, Not, RemoveEvent, UpdateEvent } from "typeorm";
import { PlaylistNode } from "./playlist.entity";

@EventSubscriber()
export class PlaylistNodeSubscriber implements EntitySubscriberInterface<PlaylistNode>{

    listenTo(): string | Function {
        return PlaylistNode
    }

    async beforeInsert(event: InsertEvent<PlaylistNode>){
        const entity = event.entity;
        const repo = event.manager;
        const order = await repo.count(PlaylistNode,{
            where:{
                screenId:entity.screenId
            }
        })
        entity.order = order + 1;
    }

    async beforeUpdate(event: UpdateEvent<PlaylistNode>){
        const repo = event.manager;
        const entity = event.entity;
        const changeOrder = event.updatedColumns.find((column)=>column.propertyName == 'order')
        if(changeOrder){
            let oldOrder:number = event.databaseEntity.order;
            let newOrder:number = event.entity.order;
            const max = await repo.count(PlaylistNode,{
                where:{
                    screenId:entity.screenId
                }
            })
            if(newOrder>max){entity.order = max;}
            const increaseOrDecrease = newOrder - oldOrder;
            if(increaseOrDecrease>0){
                await repo.decrement(PlaylistNode,{
                    screenId:entity.screenId,
                    order: Between(oldOrder,newOrder),
                    id:Not(entity.id) 
                },"order",1)
            }
            if(increaseOrDecrease<0){
                await repo.increment(PlaylistNode,{
                    screenId:entity.screenId,
                    order: Between(newOrder,oldOrder),
                    id:Not(entity.id) 
                },"order",1)
            }
        }
    }
    async beforeRemove(event: RemoveEvent<PlaylistNode>){
        const entity = event.entity;
        const repo = event.manager;
        if(entity){
            await repo.decrement(PlaylistNode,{
            screenId:entity.screenId,
            order:MoreThan(entity.order)
        },'order',1)}
        
    }


}