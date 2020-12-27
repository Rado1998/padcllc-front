export interface ICardData {
    icon: string;
    title: string;
    techs: ITech[];
}

export interface ITech {
    label: string;
    names: string[];
}
