export interface FeedItem {
    id: number;
    url: string;
    caption: string;
    filteredDataUrl: string;
}

export const feedItemMocks: FeedItem[] = [
    {
    id: 0,
    url: '/assets/mock/xander0.jpg',
    caption: 'Such a cute pup',
    filteredDataUrl: ''
    },
    {
    id: 0,
    url: '/assets/mock/xander1.jpg',
    caption: 'Who\'s a good boy?',
    filteredDataUrl: ''
    },
    {
    id: 0,
    url: '/assets/mock/xander2.jpg',
    caption: 'Majestic.',
    filteredDataUrl: ''
    }
];
