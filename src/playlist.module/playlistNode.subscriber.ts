import { File } from "src/content.module/file.entity";
import { Screen } from "src/screen.module/screen.entity";
import { Between, EntitySubscriberInterface, EventSubscriber, InsertEvent, LessThanOrEqual, LoadEvent, MoreThan, Not, RemoveEvent, UpdateEvent } from "typeorm";
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

    async afterLoad(entity: PlaylistNode, event?: LoadEvent<PlaylistNode>){
        const screenRepo = event.manager.getRepository(Screen)
        const fileRepo = event.manager.getRepository(File)
        entity.content.files = [];
        const {width,height,orientation} = await screenRepo.findOne({id:entity.screenId})
        const file = await fileRepo.find({
            where:{
                contentId: entity.contentId
            }
        })
        const easiest = file.find((f)=>{
            return f.width == width && f.height == height && f.orientation == orientation
        })
        if(easiest){
            entity.content.files.push(easiest)
            }else{
            if(file.length == 1){
                entity.content.files.push(file[0])
            }
            
            else{
                const sameOrient = file.filter((f)=>f.orientation==orientation)
                if(sameOrient.length==1){
                    entity.content.files.push(sameOrient[0])
                }
                if(sameOrient.length>1){
                    if(width>height){const sameRatio = sameOrient.filter((f)=>f.width>f.height)
                        if(sameRatio.length==0){
                            entity.content.files.push(sameOrient[0])
                        }else{
                            entity.content.files.push(sameRatio[0])
                        }
                    }else{
                        const sameRatio = sameOrient.filter((f)=>f.width<f.height)
                        if(sameRatio.length==0){
                            entity.content.files.push(sameOrient[0])
                        }else{
                            entity.content.files.push(sameRatio[0])
                        }
                    }
                }
                if(sameOrient.length==0){
                    if(width>height){
                        const sameRatio = file.filter((f)=>f.width>f.height)
                        if(sameRatio.length==0){
                            entity.content.files.push(file[0])
                        }else{
                            entity.content.files.push(file[0])
                        }
                    }else{
                        const sameRatio = file.filter((f)=>f.width<f.height)
                        if(sameRatio.length==0){
                            entity.content.files.push(file[0])
                        }else{
                            entity.content.files.push(file[0])
                        }
                    }
                }
            }
        }
        
        
    }
    


}