import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { Observable } from '../../../node_modules/rxjs';

const CONFIG = {
    space: '137nyzgfjujb',
    accessToken: 'pLaSusBrWzCFCk82O1nKuhTihKSyEixg_HIhuXIZAek'
}

@Injectable({
    providedIn: 'root'
})
export class ContentfulService{
    private cdaClient = createClient({
        space: CONFIG.space,
        accessToken: CONFIG.accessToken
    });

    constructor() {

    }

    getArticlesList() :  Promise<any> {
        return this.cdaClient.getEntries({
          content_type: 'article'
        })
        .then(res => res.items);
    }

    getCarouselItems(): Observable<any> {
        return Observable.create((observer: any) => {
            this.cdaClient.getEntries({
                content_type: 'carouselItem'
              }).then(data => observer.next(data))
              .catch(err => observer.error(err)
              )
            ;
        })
    } 

    getAssets(): Promise<any> {
        return this.cdaClient.getAssets();
    }
}
