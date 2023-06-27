import { IPosition } from "./position";

export interface ITeamMember {
    image: string;
    name: string;
    description: string;
    position?: IPosition;
};
