export type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

export const photos: Photo[] = [
  { src: '/photos/p01.jpg', alt: 'photo 1', caption: '我们的家' },
  { src: '/photos/p02.jpg', alt: 'photo 2', caption: '光照进来的时候' },
  { src: '/photos/p03.jpg', alt: 'photo 3', caption: '日常的温柔' },
  { src: '/photos/p04.jpg', alt: 'photo 4', caption: '孩子的房间' },
  { src: '/photos/p05.jpg', alt: 'photo 5', caption: '小小角落' },
  { src: '/photos/p06.jpg', alt: 'photo 6', caption: '干净明亮' },
  { src: '/photos/p07.jpg', alt: 'photo 7', caption: '我们一起把它变成家' },
];
