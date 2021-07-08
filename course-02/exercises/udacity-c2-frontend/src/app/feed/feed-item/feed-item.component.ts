import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FeedItem } from '../models/feed-item.model';

import { FeedProviderService } from '../services/feed.provider.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedItemComponent implements OnInit {
  @Input() feedItem: FeedItem;

  originalImageVisible: boolean = true;

  constructor(private feed: FeedProviderService) { }

  ngOnInit() {}

  showFilteredImage(id: any) {
    if (!this.feedItem.filteredDataUrl) {
      this.feed.getFilteredImage(id).then((result) => {
        this.feedItem.filteredDataUrl = result.dataurl;
      });
    }
    this.originalImageVisible = false;
  }
}
