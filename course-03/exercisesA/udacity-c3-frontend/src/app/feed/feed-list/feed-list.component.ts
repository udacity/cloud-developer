import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FeedItem } from '../models/feed-item.model';
import { FeedProviderService } from '../services/feed.provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListComponent implements OnInit, OnDestroy {
  @Input() feedItems: FeedItem[];
  subscriptions: Subscription[] = [];
  constructor( private feed: FeedProviderService ) { }

  async ngOnInit() {
    this.subscriptions.push(
      this.feed.currentFeed$.subscribe((items) => {
      this.feedItems = items;
    }));

    await this.feed.getFeed();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


}
