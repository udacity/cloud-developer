export interface FeedItem {
    id: number;
    url: string;
    processedUrl:string;
    caption: string;
}

export const feedItemMocks: FeedItem[] = [
    {
    id: 0,
    url: '/assets/mock/xander0.jpg',
    processedUrl: '/assets/mock/xander1.jpg',
    caption: 'Such a cute pup'
    },
    {
    id: 0,
    url: '/assets/mock/xander1.jpg',
    processedUrl: '/assets/mock/xander1.jpg',
    caption: 'Who\'s a good boy?'
    },
    {
    id: 0,
    url: '/assets/mock/xander2.jpg',
    processedUrl: '/assets/mock/xander1.jpg',
    caption: 'Majestic.'
    }
];
