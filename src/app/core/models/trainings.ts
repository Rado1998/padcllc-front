import { IMediaFile } from './media-files';

export interface ITraining {
    createdAt: string;
    date: string;
    description: string;
    id: number;
    mediaFiles: IMediaFile[];
    name: string;
    updatedAt: string;
}
