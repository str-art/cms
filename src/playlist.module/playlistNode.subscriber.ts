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
        const querryRunner = event.queryRunner
        const result = await querryRunner.query(`
        SELECT 
        f.id,
        f.width,
        f.height,
        f.orientation,
        f.key,
        f."contentId",
        f."contentType",
        CASE 
        WHEN (s.width - f.width) < 0 THEN (s.width - f.width) * -1
        WHEN (s.width - f.width) >= 0 THEN (s.width - f.width)
        END AS "widthDiff",
        CASE 
        WHEN (s.height - f.height) < 0 THEN (s.height - f.height) * -1
        WHEN (s.height - f.height) >= 0 THEN (s.height - f.height)
        END AS "heightDiff",
        CASE 
        WHEN (CAST(s.orientation AS VARCHAR) = CAST(f.orientation AS VARCHAR)) THEN 1
        ELSE 0
        END AS "sameOrient"
        FROM screen AS "s"
        CROSS JOIN file AS "f"
        WHERE s.id = ${entity.screenId}
        AND f."contentId" = ${entity.contentId}
        ORDER BY "sameOrient" DESC,"widthDiff" ASC, "heightDiff" ASC
        FETCH FIRST 1 ROWS ONLY;
        `)
        entity.content.files = [];
        const {heightDiff,widthDiff,sameOrient,...file} = result[0]
        entity.content.files.push(file)
       
    }
    


}